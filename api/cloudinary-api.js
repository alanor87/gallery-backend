
require('dotenv').config();

const { CLOUDINARY_CLOUD_NAME: cloud_name,
    CLOUDINARY_API_KEY: api_key,
    CLOUDINARY_API_SECRET: api_secret } = process.env;

const cloudinary = require('cloudinary');
cloudinary.config({ cloud_name, api_key, api_secret });

module.exports = { cloudinary };