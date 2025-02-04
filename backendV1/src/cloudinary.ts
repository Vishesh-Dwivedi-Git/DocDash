// cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import { data } from "./config";

cloudinary.config({
  cloud_name: data.cloud_name,
  api_key: data.api_key,
  api_secret: data.api_secret
});

export const uploadToCloudinary = async (filePath: string, fileType: string) => {
  try {
    let resourceType: string;

    // Determine resource type based on the file type
    if (fileType.includes("video")) {
      resourceType = "video";
    } else if (fileType.includes("image")) {
      resourceType = "image";
    } else if (fileType.includes("pdf")) {
      resourceType = "raw";  // PDF is uploaded as raw files in Cloudinary
    } else {
      throw new Error("Unsupported file type");
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType as "image" | "video" | "raw" | "auto",
    });

    return result.secure_url; // Return the URL of the uploaded file
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary Upload Failed");
  }
};