import Order from "../MODELS/order.model.js";
import { recalcProductAvailability } from "../SERVICES/products.service.js";
import { Products } from "../MODELS/products.model.js";
import { Stock } from "../MODELS/stock.model.js";

const generateOrderId = () => {
  return "TCK-" + crypto.randomUUID().slice(0, 8).toUpperCase();
};

export const createOrder = async ({ items, notes }) => {
  if (!items || items.length === 0) {
    throw new Error("El ticket debe contener al menos un producto");
  }

  let total = 0;
  const processedItems = [];

  for (const item of items) {
    const product = await Products.findOne({ id: item.productId });

    if (!product) {
      const err = new Error(`Producto con id ${item.productId} no existe`);
      err.status = 404;
      throw err;
    }

    for (const ing of product.ingredients) {
      const stockItem = await Stock.findOne({ id: ing.ingredientId }); 

      if (!stockItem) {
        const err = new Error(`Ingrediente con id ${ing.ingredientId} no existe en Stock`);
        err.status = 500;
        throw err;
      }

      const requiredAmount = ing.quantity * item.qty;

      if (stockItem.quantity < requiredAmount) {
        const err = new Error(
          `Stock insuficiente: ${stockItem.name}. Necesario: ${requiredAmount} ${stockItem.unit}, Disponible: ${stockItem.quantity}`
        );
        err.status = 400;
        throw err;
      }
    }

    for (const ing of product.ingredients) {
      const requiredAmount = ing.quantity * item.qty;

      await Stock.findOneAndUpdate(
        { id: ing.ingredientId },   
        { $inc: { quantity: -requiredAmount } },
        { new: true }
      );
    }

  
    const subtotal = product.price * item.qty;
    total += subtotal;

    processedItems.push({
      productId: product._id,
      name: product.name,
      qty: item.qty,
      price: product.price,
      subtotal,
    });
  }


  const allProducts = await Products.find({});
  for (const p of allProducts) {
    let available = true;

    for (const ing of p.ingredients) {
      const stockItem = await Stock.findOne({ id: ing.ingredientId });

      if (!stockItem || stockItem.quantity < ing.quantity) {
        available = false;
        break;
      }
    }

    p.available = available;
    await p.save();
  }

  const orderId = generateOrderId();

  const newOrder = new Order({
    orderId,
    items: processedItems,
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
    const err = new Error("Invalid status");
    err.status = 400;
    throw err;
  }

  const order = await Order.findOne({ orderId });
  if (!order) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  if (newStatus === "canceled" && order.status !== "canceled") {
    for (const item of order.items) {
      const product = await Products.findById(item.productId);
      if (!product) continue;

      for (const ing of product.ingredients) {
        const amountToRestore = ing.quantity * item.qty;

      
        await Stock.findOneAndUpdate(
          { id: ing.ingredientId },
          { $inc: { quantity: amountToRestore } }
        );
      }
    }

    const allProducts = await Products.find();

    for (const p of allProducts) {
      const available = await recalcProductAvailability(p);
      p.available = available;
      await p.save();
    }
  }

  const updated = await Order.findOneAndUpdate(
    { orderId },
    { status: newStatus },
    { new: true }
  );
  

  return updated;
};

export const deleteOrder = async (orderId) => {
  return await Order.findOneAndDelete({ orderId });
};
