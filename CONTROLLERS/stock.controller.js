import * as service from "../SERVICES/stock.service.js";

export async function create(req, res, next) {
    try {
        const item = await service.createStockItem(req.body);

        res.status(201).json({
            message: "Stock item was created successfully",
            values: item
        });
    } catch (err) {
        next(err);
    }
}

export async function getById(req, res, next) {
    try {
        const id = req.params.id;
        const item = await service.getStockById(id);

        res.status(200).json({
            message: `Here is the stock item with id ${id}`,
            values: item
        });
    } catch (err) {
        next(err);
    }
}

export async function getAll(req, res, next) {
    try {
        const items = await service.getAllStock();

        res.status(200).json({
            message: "Here is all the stock",
            values: items
        });
    } catch (err) {
        next(err);
    }
}

export async function updateById(req, res, next) {
    try {
        const updated = await service.updateStockById(req.params.id, req.body);

        res.status(200).json({
            message: `The stock item with id ${req.params.id} was updated`,
            values: updated
        });

    } catch (err) {
        next(err);
    }
}

export async function updateQuantity(req, res, next) {
    try {
        const { quantity } = req.body;

        if (quantity == null) {
            return res.status(400).json({ error: "Quantity is required" });
        }

        const updated = await service.updateStockQuantity(req.params.id, quantity);

        res.status(200).json({
            message: `Quantity updated for stock item with id ${req.params.id}`,
            values: updated
        });

    } catch (err) {
        next(err);
    }
}

export async function deleteById(req, res, next) {
    try {
        const deleted = await service.deleteStockById(req.params.id);

        res.status(200).json({
            message: `The stock item with id ${req.params.id} was deleted`,
            values: deleted
        });

    } catch (err) {
        next(err);
    }
}
