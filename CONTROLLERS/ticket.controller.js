import * as service from "../SERVICES/ticket.service.js";

export const create = async (req, res, next) => {
  try {
    const { items, total, customer, notes } = req.body;

    const order = await service.createOrder({
      items,
      total,
      notes,
    });

    res.status(201).json({
      message: "Ticket creado exitosamente",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const orders = await service.getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await service.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "El estado es requerido" });
    }

    const updatedOrder = await service.updateOrderStatus(orderId, status);

    res.status(200).json({
      message: "Estado actualizado correctamente",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const deleted = await service.deleteOrder(orderId);

    if (!deleted) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    res.status(200).json({ message: "Ticket eliminado" });
  } catch (error) {
    next(error);
  }
};