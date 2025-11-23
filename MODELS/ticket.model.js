import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },

  items: {
    type: [OrderItemSchema],
    required: true
  },

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending"
  },

  notes: {
    type: String
  }
}, {
  timestamps: true 
});

OrderSchema.pre("validate", function (next) {
  if (!this.orderId) {
    this.orderId = "ORD-" + Date.now();
  }
  next();
});

export default mongoose.model('Order', OrderSchema, 'Order');
