import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  variant: { type: String },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
    required: true,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    required: true,
  },
  location: { type: String, required: true },
  mileage: { type: Number, required: true },
  kmsDriven: { type: Number, required: true },
  description: { type: String },
  color: { type: String, required: true },
  tag: { type: String, required: true },
  images: [{ type: String }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Car", carSchema);
