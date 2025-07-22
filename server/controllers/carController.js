import fs from "fs/promises";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
import cloudinary from "../utils/cloudinary.js";

export const createCar = async (req, res) => {
  try {
    console.log(req.body);
    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: `autoAxis/${req.body.model}`,
      })
    );

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.map((result) => result.secure_url);

    const newCar = new Car({
      ...req.body,
      images: imageUrls,
      postedBy: req.userId,
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
    await Promise.all(
      req.files.map(async (file) => {
        try {
          await fs.rm(`uploads/autoAxis/${req.body.model}`, {
            recursive: true,
            force: true,
          });
        } catch (err) {
          console.warn("Failed to delete:", file.path, err.message);
        }
      })
    );
  } catch (err) {
    console.error("Create car error:", err);
    res.status(500).json({
      message: "Failed to create car",
      error: err.message,
    });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate(
      "postedBy",
      "name email"
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Failed to get car", error: err.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: "Car not found" });

    req.userId = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id;
    if (car.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized: Not your car" });
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );
      const uploadedImages = await Promise.all(uploadPromises);
      req.body.images = uploadedImages.map((result) => result.secure_url);
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedCar);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update car", error: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    req.userId = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id;
    const car = await Car.findById(req.params.id);

    if (!car) return res.status(404).json({ message: "Car not found" });

    if (car.postedBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own car" });
    }

    await car.deleteOne();
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete car", error: err.message });
  }
};

export const getCarsByUser = async (req, res) => {
  try {
    const cars = await Car.find({ postedBy: req.params.userId }).populate(
      "postedBy",
      "name email"
    );
    res.status(200).json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get user cars", error: err.message });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("postedBy", "name ");
    res.status(200).json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to fetch cars.", error: err.message });
  }
};
