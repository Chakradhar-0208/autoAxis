import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import dotenv from "dotenv";
import { verifyToken } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";
import signupRoutes from "./Routes/signup.js";
import loginRoutes from "./Routes/login.js";
import logoutRoute from "./Routes/logout.js";
import carRoutes from "./Routes/car.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import jwt from "jsonwebtoken";
cloudinary.config({
  cloud_name: "dppnjyn8a",
  api_key: "833586591719684",
  api_secret: "YUX7G7BFRjl-xYpeNfhv6Ov7uU8",
});

dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "autoApex",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoute);
app.use("/car", carRoutes);

const upload = multer({ dest: "tmp/" });

app.get("/", (req, res) => {
  res.send("Hellooo");
});

app.post("/upload-images", upload.array("images", 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    console.log("🖼 Uploaded files:", req.files);

    const uploadResults = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: file.originalname.split(".")[0],
      });

      fs.unlinkSync(file.path);
      uploadResults.push(result.secure_url);
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      urls: uploadResults,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: error.message,
    });
  }
});

app.get("/getUserData", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching user data" });
  }
});

app.get("/check-login", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "User Logged in false" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "User Logged in true", userId: decoded });
  } catch (err) {
    return res.status(401).json({ message: "User Logged in false" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on PORT ${PORT}`);
});
