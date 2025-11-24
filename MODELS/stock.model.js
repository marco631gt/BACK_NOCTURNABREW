import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true      
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  unit: {
    type: String,
    enum: ["g", "ml", "piece"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

export const Stock = mongoose.model("Stock", stockSchema, "Stock");
