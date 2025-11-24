import { Stock } from "../MODELS/stock.model.js";
import { Products } from "../MODELS/products.model.js";

async function recalcProductAvailability(product) {
    for (const ing of product.ingredients) {
        const stockItem = await Stock.findOne({ _id: ing.ingredientId });

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

export async function updateStockById(id, newInfo) {
    return await Stock.findOneAndUpdate({ id }, newInfo, { new: true });
}

export async function updateStockQuantity(id, quantity) {
    const updated = await Stock.findOneAndUpdate(
        { id },
        { quantity },
        { new: true }
    );

    if (!updated) return null;

    const products = await Products.find({
        "ingredients.ingredientId": updated._id
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
