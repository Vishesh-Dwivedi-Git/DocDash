
require("dotenv").config();


if (!process.env.MONGO_URL || !process.env.JWT_PASSWORD) {
    throw new Error("Missing required environment variables: MONGO_URL or JWT_PASSWORD");
}


export const data = {
    MongoURL: process.env.MONGO_URL,  // No need for `as string` due to the check above
    JwtPassword: process.env.JWT_PASSWORD,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_Together:process.env.TOGETHER_AI_API_KEY,
  api_huggingFace:process.env.HF_API_KEY

};
