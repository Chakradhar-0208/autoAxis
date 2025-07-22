import dotenv from "dotenv";
import express from "express";
import Car from "../models/Car.js";
import {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getCarById,
  getCarsByUser,
} from "../controllers/carController.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/auth.js";

dotenv.config();

const router = express.Router();

router.get("/getAllCars", getAllCars);

router.post("/createCar", verifyToken, upload.array("images", 10), createCar);
router.get("/getCarsByUser/:userId", getCarsByUser);
router.put(
  "/updateCar/:id",
  verifyToken,
  upload.array("images", 10),
  updateCar
);

router.delete("/deleteCar/:id", verifyToken, deleteCar);
router.get("/getCarbyId/:id", getCarById);

export default router;
