
import { Content } from "../db";
import { Upload } from "../db";
import { generateEmbedding } from "./embeddingService";

const cosineSimilarity = (vec1: number[], vec2: number[]): number => {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
};

export const retrieveSimilarDocs = async (query: string, threshold = 0.75) => {

  // Generate query embedding
  const queryEmbedding = await generateEmbedding(query);

  // Fetch all stored documents
  const contentDocs = await Content.find();
  const uploadDocs = await Upload.find();

  // Calculate similarity for content collection
  const relevantContent = contentDocs
    .map((doc) => ({
      doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding as number[]),
    }))
    .filter((item) => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity) // Sort by highest similarity
    .map((item) => item.doc);

  // Calculate similarity for upload collection
  const relevantUploads = uploadDocs
    .map((doc) => ({
      doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }))
    .filter((item) => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map((item) => item.doc);


  return [...relevantContent, ...relevantUploads]; // Merge both collections
};
