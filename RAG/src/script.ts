import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { HfInference } from "@huggingface/inference";

config(); // Load environment variables

const mongoUri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB!;
const collectionName = process.env.MONGO_COLLECTION!;
const hfApiKey = process.env.HF_API_KEY!;
const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2"; // Choose appropriate model

const hf = new HfInference(hfApiKey);

async function generateEmbeddings() {
  const client = new MongoClient(mongoUri);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);

    // Debug: List available collections
    const collections = await db.listCollections().toArray();
    console.log("Available Collections:", collections.map(c => c.name));

    if (!collections.some(c => c.name === collectionName)) {
      console.error(`Collection "${collectionName}" not found!`);
      return;
    }

    const collection = db.collection(collectionName);
    console.log(`Using collection: ${collectionName}`);

    // Fetch all documents
    const documents = await collection.find().toArray();
    
    // Debug: Log first few documents to check structure
    console.log(`Found ${documents.length} documents.`);
    if (documents.length > 0) console.log("Sample document:", documents[0]);

    for (const doc of documents) {
      const textField = doc.title || doc.description || doc.file || doc.fileType || ""; // Adjust based on schema
      if (!textField) {
        console.warn(`Skipping document ${doc._id} due to missing text field.`);
        continue;
      }

      try {
        // Generate embedding for the text field
        console.log(`Generating embedding for document ${doc._id}...`);
        const response = await hf.featureExtraction({
          model: embeddingModel,
          inputs: textField,
        });

        if (Array.isArray(response)) {
          // Update the document with the generated embedding
          await collection.updateOne(
            { _id: doc._id },
            { $set: { embedding: response } }
          );
          console.log(`Updated document ${doc._id} with embedding`);
        }
      } catch (embedError) {
        console.error(`Error generating embedding for document ${doc._id}:`, embedError);
      }
    }
  } catch (error) {
    console.error("Error updating embeddings:", error);
  } finally {
    await client.close();
    console.log("Closed MongoDB connection.");
  }
}

generateEmbeddings();
