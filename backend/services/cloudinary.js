const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/index').cloudinaryConfig;


cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

module.exports = cloudinary;
