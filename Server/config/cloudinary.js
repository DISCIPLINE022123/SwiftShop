import { v2 as cloudinary } from 'cloudinary';
dotenv.config(); // Yeh line file ke sabse upar honi chahiye
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';


// Cloudinary Account Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage Engine Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SwiftShop_Products', // Cloudinary par folder ka naam
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }] // Auto-resize
  }
});
// config/cloudinary.js ke last mein

const upload = multer({ storage: storage });

export default upload;