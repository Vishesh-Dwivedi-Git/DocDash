import axios from "axios";
import {data} from "../config" 

const TOGETHER_AI_API_KEY = data.api_Together;
const HUGGINGFACE_API_KEY = data.api_huggingFace ;

export const generateEmbedding = async (text: string, model: string = "together") => {
  try {
    if (model === "together") {
      const response = await axios.post(
        "https://api.together.xyz/v1/embeddings",
        { input: text, model: "togethercomputer/embedding-m3" },
        { headers: { Authorization: `Bearer ${TOGETHER_AI_API_KEY}` } }
      );
      return (response.data as { data: { embedding: number[] }[] }).data[0].embedding;
    } else {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
        { inputs: text },
        { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
      );
      return (response.data as number[][])[0];
    }
  } catch (error) {
    console.error("Embedding generation failed:", error);
    return [];
  }
};
