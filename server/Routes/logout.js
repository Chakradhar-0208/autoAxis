import express from "express";
const router = express.Router();
const NODE_ENV = process.env.NODE_ENV;


router.get("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
