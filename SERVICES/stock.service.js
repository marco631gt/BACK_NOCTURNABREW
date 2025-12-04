import { Stock } from "../MODELS/stock.model.js";
import { Products } from "../MODELS/products.model.js";

async function recalcProductAvailability(product) {
    for (const ing of product.ingredients) {
        const stockItem = await Stock.findOne({ id: ing.ingredientId });

        if (!stockItem || stockItem.quantity < ing.quantity) {
            return false;
        }
    }
    return true;
}

export async function createStockItem(data) {
    const nameExists = await Stock.findOne({ name: data.name });
    const idExists = await Stock.findOne({ id: data.id });

    if (nameExists) {
        const err = new Error(`The ingredient ${data.name} already exists`);
        err.status = 409;
        throw err;
    }

    if (idExists) {
        const err = new Error(`An ingredient with id ${data.id} already exists`);
        err.status = 409;
        throw err;
    }

    const doc = await Stock.create(data);
    return doc.toObject();
}

export async function getStockById(id) {
    return await Stock.findOne({ id });
}

export async function getAllStock() {
    try {
        return await Stock.find();
    } catch (err) {
        throw new Error("Error fetching stock: " + err.message);
    }
}


export async function updateStockItemById(id, newInfo) {

    const exists = await Stock.findOne({ id });
    if (!exists) {
        const err = new Error("Stock item not found");
        err.status = 404;
        throw err;
    }

    if (newInfo.name) {
        const nameExists = await Stock.findOne({ name: newInfo.name });
        if (nameExists && nameExists.id !== Number(id)) {
            const err = new Error(`Ingredient ${newInfo.name} already exists`);
            err.status = 409;
            throw err;
        }
    }

    if (newInfo.id) {
        const idExists = await Stock.findOne({ id: newInfo.id });
        if (idExists && idExists.id !== Number(id)) {
            const err = new Error(`Another ingredient with id ${newInfo.id} already exists`);
            err.status = 409;
            throw err;
        }
    }

    if (newInfo.quantity !== undefined) {
        newInfo.quantity = exists.quantity + newInfo.quantity;
    }

    const updated = await Stock.findOneAndUpdate(
        { id },
        newInfo,
        { new: true }
    );

    if (!updated) {
        const err = new Error("Stock item not found");
        err.status = 404;
        throw err;
    }

    const products = await Products.find({
        "ingredients.ingredientId": updated.id 
    });

    for (const product of products) {
        const available = await recalcProductAvailability(product);
        product.available = available;
        await product.save();
    }

    return updated;
}

export async function deleteStockById(id) {
    return await Stock.findOneAndDelete({ id });
}
