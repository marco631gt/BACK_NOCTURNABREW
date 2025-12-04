import { Products } from '../MODELS/products.model.js';
import { Stock } from '../MODELS/stock.model.js';

export async function recalcProductAvailability(product) {
    for (const ing of product.ingredients) {
        const stockItem = await Stock.findOne({ id: ing.ingredientId }); 

        if (!stockItem || stockItem.quantity < ing.quantity) {
            return false;
        }
    }
    return true;
}

export async function createProduct(data) {

    const nameExists = await Products.findOne({ name: data.name });
    if (nameExists !== null) {
        const err = new Error(`The product ${data.name} already exists`);
        err.status = 409;
        throw err;
    }

    const idExists = await Products.findOne({ id: data.id });
    if (idExists !== null) {
        const err = new Error(`A product with id ${data.id} already exists`);
        err.status = 409;
        throw err;
    }

    if (data.ingredients && data.ingredients.length > 0) {
        for (const ing of data.ingredients) {

            const exists = await Stock.findOne({ id: ing.ingredientId });

            if (!exists) {
                const err = new Error(`Ingredient with ID ${ing.ingredientId} does not exist in Stock`);
                err.status = 400;
                throw err;
            }
        }
    }

    data.available = await recalcProductAvailability(data);

    const doc = await Products.create(data);
    return doc.toObject();
}


export async function getProductById(id) {
    return await Products.findOne({ id });
}

export async function getAllProducts() {
    try {
        return await Products.find();
    } catch (err) {
        throw new Error("Error fetching all products: " + err.message);
    }
}

export async function listProductByCategory(category) {
    return await Products.find({ category });
}

export async function updateProductById(id, newInfo) {

    if (newInfo.ingredients) {
        for (const ing of newInfo.ingredients) {

            const exists = await Stock.findOne({ id: ing.ingredientId }); // ⬅️ usar id numérico

            if (!exists) {
                const err = new Error(`Ingredient ${ing.ingredientId} doesn't exist`);
                err.status = 400;
                throw err;
            }
        }
    }

    const updated = await Products.findOneAndUpdate(
        { id },
        newInfo,
        { new: true }
    );

    if (!updated) return null;

    if (!newInfo.hasOwnProperty("available")) {
    updated.available = await recalcProductAvailability(updated);
    await updated.save();
    }

    return updated;
}

export async function deleteProductById(id) {
    return await Products.deleteOne({ id });
}
