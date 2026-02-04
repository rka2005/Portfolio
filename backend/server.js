const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const { connectToMongo } = require("./db");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const app = express();
let db;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

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
    const items = await db
      .collection("achievements")
      .find(
        {},
        {
          projection: {
            title: 1,
            description: 1,
            imageUrl: 1,
            createdAt: 1,
          },
        }
      )
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    res.json({ success: true, data: items });
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

    app.listen(PORT, () => {
      console.log(`>> SERVER RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(">> DB CONNECTION ERROR:", err);
  });
