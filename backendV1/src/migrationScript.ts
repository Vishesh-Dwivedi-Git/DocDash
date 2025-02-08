
import mongoose from "mongoose";
import { Content } from "./db";
import { Upload } from "./db";
import { generateEmbedding } from "./RAG/embeddingService";


export const updateEmbeddings = async () => {
   
    const contentDocs = await Content.find({ embedding: { $size: 0 } });
    const uploadDocs = await Upload.find({ embedding: { $size: 0 } });
    console.log(contentDocs);
    console.log(uploadDocs);
  
    for (let doc of contentDocs) {
      const embedding = await generateEmbedding(`${doc.title} ${doc.link} ${doc.type}`);
      await Content.updateOne({ _id: doc._id }, { $set: { embedding } });
    }
  
    for (let doc of uploadDocs) {
      const embedding = await generateEmbedding(`${doc.title} ${doc.description} ${doc.file} ${doc.fileType}`);
      await Upload.updateOne({ _id: doc._id }, { $set: { embedding } });
    }
  
    console.log("Embeddings updated successfully!");

  };



