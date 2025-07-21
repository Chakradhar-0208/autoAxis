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
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;

app.use(
  cors({
    origin: "https://auto-axis-cp.vercel.app",
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



app.get("/", (req, res) => {
  res.send("Hellooo");
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
      .json({ message: "User Logged in true", userId: decoded.id });
  } catch (err) {
    return res.status(401).json({ message: "User Logged in false" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on PORT ${PORT}`);
});
