// import { HfInference } from "@huggingface/inference";
// import { Content,Upload } from "../db";
// import { data } from "../config";

// const hfApiKey = data.api_huggingFace;
// const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2"; // Choose appropriate model

// const hf = new HfInference(hfApiKey);

// function cosineSimilarity(vecA: number[], vecB: number[]): number {
//     const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
//     const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
//     const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
//     return dotProduct / (normA * normB);
//   }
  
// async function searchDatabase(query: string) {
  
//     try {

//       // Generate embedding for search query
//       console.log(`Generating embedding for search query: "${query}"`);

//       const queryEmbedding = await hf.featureExtraction({
//         model: embeddingModel,
//         inputs: query,
//       });
  
//       if (!Array.isArray(queryEmbedding)) {
//         throw new Error("Failed to generate query embedding");
//       }
     
//       const queryEmbeddingArray: number[] = Array.isArray(queryEmbedding) ? queryEmbedding.flat(Infinity) as number[] : [];
    
//       // Fetch all documents from both collections
//       const contentDocuments = await Content.find().exec();
//       const uploadDocuments = await Upload.find().exec();
//       const allDocuments = [...contentDocuments, ...uploadDocuments];
  
//       // Calculate similarity scores
//       const results = allDocuments
//         .map((doc) => {
//           if (!doc.embedding) return null; // Skip if embedding is missing
//           const similarity = cosineSimilarity(queryEmbeddingArray, doc.embedding as number[]);
//           return { ...doc, similarity };
//         })
//         .filter((doc) => doc !== null)
//         .sort((a, b) => b!.similarity - a!.similarity) // Sort by relevance
//         .slice(0, 5); // Return top 5 most relevant documents
  
//       return results;
//     } catch (error) {
//       console.error("Error searching database:", error);
//       return [];
//     } 
//   }
  
//   export default searchDatabase;