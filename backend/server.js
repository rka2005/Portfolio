require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const Achievement = require('./models/Achievement');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- CONFIGURATION ---
// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. MongoDB Config with connection options
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4 // Force IPv4
})
  .then(() => console.log('>> MONGODB CONNECTED'))
  .catch(err => console.log('>> DB CONNECTION ERROR:', err));

// 3. Multer Config - Use memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio_achievements',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// --- ROUTES ---

// GET: Test route
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is Running...');
});

// POST: Upload Route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const { title, description } = req.body;

    // Upload to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

    const newAchievement = new Achievement({
      title,
      description,
      imageUrl: cloudinaryResult.secure_url, 
      cloudinaryId: cloudinaryResult.public_id
    });

    await newAchievement.save();

    res.status(201).json({
      success: true,
      message: 'Upload Successful',
      data: newAchievement
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// --- SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`>> SERVER RUNNING ON PORT ${PORT}`);
});