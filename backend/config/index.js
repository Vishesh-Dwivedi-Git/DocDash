// config/index.js
require('dotenv').config();  // Load environment variables from .env

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  dbUri: process.env.MONGO_URI,
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  port:5000,  // Default port
};
