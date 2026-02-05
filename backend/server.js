require("dotenv").config();

const fs = require('fs');
const path = require('path');
const express = require("express");
const { connectToMongo } = require("./db");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const app = express();
let db;
// Simple in-memory cache for paginated results
const cache = new Map(); // key -> { ts, data }
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

// --- MIDDLEWARE ---
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rohitadak.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// optional compression if installed
try {
  // eslint-disable-next-line global-require
  const compression = require('compression');
  app.use(compression());
  console.log('>> compression enabled');
} catch (e) {
  console.log('>> compression not installed — skipping');
}

// --- PORT ---
const PORT = process.env.PORT || 5000;

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- MULTER CONFIG ---
const upload = multer({ storage: multer.memoryStorage() });

// --- CLOUDINARY UPLOAD FUNCTION ---
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio_achievements",
        allowed_formats: ["jpg", "png", "jpeg", "webp", "gif"],
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
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

// Test Route
app.get("/", (req, res) => {
  res.send("Portfolio Backend API is Running...");
});

// Upload Achievement Route
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded" });
    }

    const { title, description } = req.body;

    // Upload Image to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

    // Document to Save
    const doc = {
      title,
      description,
      imageUrl: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id,
      createdAt: new Date(),
    };

    // Save to MongoDB
    const insertResult = await db
      .collection("achievements")
      .insertOne(doc);

    res.status(201).json({
      success: true,
      message: "Upload Successful",
      data: { _id: insertResult.insertedId, ...doc },
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// Fetch Achievements Route (FAST)
app.get("/api/achievements", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '100', 10)));
    const key = `${page}:${limit}`;

    // return cached copy when fresh
    const cached = cache.get(key);
    if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
      return res.json({ success: true, data: cached.data, cached: true });
    }

    const items = await db
      .collection('achievements')
      .find({}, { projection: { title: 1, description: 1, cloudinaryId: 1, imageUrl: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // build smaller/responsive image URLs when cloudinaryId available
    const transformed = items.map(item => {
      const thumbUrl = item.cloudinaryId
        ? cloudinary.url(item.cloudinaryId, { width: 800, crop: 'limit', quality: 'auto', fetch_format: 'auto' })
        : item.imageUrl;
      return { _id: item._id, title: item.title, description: item.description, imageUrl: thumbUrl, createdAt: item.createdAt };
    });

    // cache and respond
    cache.set(key, { ts: Date.now(), data: transformed });
    res.json({ success: true, data: transformed, cached: false });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

// --- CONNECT DB & START SERVER ---
connectToMongo()
  .then((database) => {
    db = database;
    console.log(">> MONGODB CONNECTED");

    // If requested, serve frontend static build (useful for single-service deploys)
    const serveFrontend = process.env.SERVE_FRONTEND === 'true' || process.env.NODE_ENV === 'production';
    if (serveFrontend) {
      const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
      if (fs.existsSync(frontendDist)) {
        app.use(express.static(frontendDist));
        app.get('*', (req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
        console.log('>> Serving frontend from', frontendDist);
      } else {
        console.warn('>> Frontend build not found at', frontendDist);
      }
    }

    app.listen(PORT, () => {
      console.log(`>> SERVER RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(">> DB CONNECTION ERROR:", err);
  });
