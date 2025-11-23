import Order from "../MODELS/ticket.model.js";
import crypto from "crypto";

const generateOrderId = () => {
  return "TCK-" + crypto.randomUUID().slice(0, 8).toUpperCase();
};

export const createOrder = async ({ items, total, customer, notes }) => {
  if (!items || items.length === 0) {
    throw new Error("El ticket debe contener al menos un producto");
  }

  const orderId = generateOrderId();

  const newOrder = new Order({
    orderId,
    items,
    total,
    notes,
  });

  await newOrder.save();
  return newOrder;
};

export const getAllOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const getOrderById = async (orderId) => {
  return await Order.findOne({ orderId });
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const allowedStatuses = ["pending", "paid", "canceled"];

  if (!allowedStatuses.includes(newStatus)) {
    const err = new Error("Estado no válido");
    err.status = 400;
    throw err;
  }

  const updated = await Order.findOneAndUpdate(
    { orderId },
    { status: newStatus },
    { new: true }
  );

  if (!updated) {
    const err = new Error("Orden no encontrada");
    err.status = 404;
    throw err;
  }

  return updated;
};

export const deleteOrder = async (orderId) => {
  return await Order.findOneAndDelete({ orderId });
};