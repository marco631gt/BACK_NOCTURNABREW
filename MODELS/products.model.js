import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  ingredientId: {
    type: Number,
    required: true
  },
  ingredientName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ["g", "ml", "piece"],
    required: true
  }
}, { _id: false });

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: true
  },

  ingredients: {
    type: [IngredientSchema],
    default: []
  }
});

export const Products = mongoose.model("Products", productSchema, "Products");
