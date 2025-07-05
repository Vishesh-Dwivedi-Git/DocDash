// import { HfInference } from "@huggingface/inference";
// import { data } from "../config";

// const hfApiKey = data.api_huggingFace;
// const embeddingModel = "sentence-transformers/all-MiniLM-L6-v2"; // Choose an appropriate model

// const hf = new HfInference(hfApiKey);

// async function generateAIResponse(documents: any[], query: string) {
//     // Construct the context from both schema types
//     const context = documents
//       .map((doc) => {
//         // Handle both types of documents
//         if (doc.title && doc.link && doc.type) {
//           return `Title: ${doc.title}, Link: ${doc.link}, Type: ${doc.type}`;
//         } else if (doc.title && doc.description && doc.file && doc.fileType) {
//           return `Title: ${doc.title}, Description: ${doc.description}, File: ${doc.file}, FileType: ${doc.fileType}`;
//         } else {
//           return ""; // Handle unexpected schema formats gracefully
//         }
//       })
//       .filter(Boolean) // Remove empty strings
//       .join("\n");

//     const prompt = `You are an AI assistant. Based on the following information, answer the query: "${query}"\n\n${context}`;

//     try {
//       console.log("Generating AI response...");
//       const response = await hf.textGeneration({
//         model: "tiiuae/falcon-7b-instruct", // Use a high-quality LLM
//         inputs: prompt,
//       });

//       return response.generated_text || "No relevant answer found.";
//     } catch (error) {
//       console.error("Error generating AI response:", error);
//       return "Error generating response.";
//     }
// }

// export { generateAIResponse };
