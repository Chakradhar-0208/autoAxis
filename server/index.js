import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";
import carRoutes from "./Routes/car.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./Routes/login.js";
import logoutRoute from "./Routes/logout.js";
import signupRoutes from "./Routes/signup.js";
import { verifyToken } from "./middlewares/auth.js";

dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://auto-axis-cp.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

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
      .json({ message: "User Logged in true", userId: decoded });
  } catch (err) {
    return res.status(401).json({ message: "User Logged in false" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on PORT ${PORT}`);
});
