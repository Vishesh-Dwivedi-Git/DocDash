import axios from "axios";
import { retrieveSimilarDocs } from "./retrieveSimilar";
import { data } from "../config";
import { application } from "express";

const TOGETHER_AI_API_KEY = data.api_Together;
const HUGGINGFACE_API_KEY = data.api_huggingFace;

export const generateRAGResponse = async (query: string, model: string = "together") => {
  // Retrieve relevant documents
  const relevantDocs = await retrieveSimilarDocs(query);

  // Format context from relevant docs
  const context = relevantDocs
    .map((doc) => {
      if ("link" in doc) {
        return `Title: ${doc.title}\nDescription: ${'description' in doc ? doc.description : "N/A"}\nLink: ${doc.link}\nType: ${doc.type}\nTags: ${doc.tags || "N/A"}`;
      } else {
        return `Title: ${doc.title}\nDescription: ${'description' in doc ? doc.description : "N/A"}${'file' in doc ? `\nFile: ${doc.file}\nFile Type: ${doc.fileType}` : ""}`;
      }
    })
    .join("\n\n");

  // Send query to the LLM
  try {
    if (model === "together") {
      const response = await axios.post(
        "https://api.together.xyz/v1/chat/completions",
        {
          model: "mistral-7b-instruct",
          messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: `Context: ${context}\n\nQuery: ${query}` }],
        },
        { headers: { Authorization: `Bearer ${TOGETHER_AI_API_KEY}` } }
      );
      return (response.data as { choices: { message: { content: string } }[] }).choices[0].message.content;
    } else {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
        { inputs: `Context: ${context}\n\nQuery: ${query}` },
        { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
      );
      return (response.data as { generated_text: string }).generated_text;
    }
  } catch (error) {
    console.error("Error generating RAG response:", error);
    return "I couldn't retrieve an answer.";
  }
};

