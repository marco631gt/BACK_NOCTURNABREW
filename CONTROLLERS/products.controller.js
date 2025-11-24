import * as service from '../SERVICES/products.service.js';

export async function create(req, res, next) {
    try {
        const product = await service.createProduct(req.body);
        res.status(201).json({
            message: "Product was created successfully",
            values: product
        });
    } catch (err) {
        next(err);
    }
}

export async function getById(req, res, next) {
    try {
        const id = req.params.id;
        const product = await service.getProductById(id);
        res.status(200).json({
            message: `Here is the product with id ${id}`,
            values: product
        });
    } catch (err) {
        next(err);
    }
}

export async function getAll(req, res, next) {
    try {
        const products = await service.getAllProducts();
        res.status(200).json({
            message: "Here are all the products",
            values: products
        });
    } catch (err) {
        next(err);
    }
}

export async function listByCategory(req, res, next) {
    try {
        const category = req.params.category;
        const products = await service.listProductByCategory(category);
        res.status(200).json({
            message: `Here are the products with category ${category}`,
            values: products
        });
    } catch (err) {
        next(err);
    }
}

export async function updateById(req, res, next) {
    try {
        const newInfo = {};

        if (req.body.name) newInfo.name = req.body.name;
        if (req.body.price) newInfo.price = req.body.price;
        if (req.body.category) newInfo.category = req.body.category;
        if (req.body.description) newInfo.description = req.body.description;
        if (req.body.ingredients) newInfo.ingredients = req.body.ingredients;
        if (req.body.hasOwnProperty('available'))
            newInfo.available = req.body.available;

        const updated = await service.updateProductById(req.params.id, newInfo);

        res.status(200).json({
            message: `Product with id ${req.params.id} was updated`,
            values: updated
        });
    } catch (err) {
        next(err);
    }
}

export async function deleteById(req, res, next) {
    try {
        const id = req.params.id;
        const deleted = await service.deleteProductById(id);

        res.status(200).json({
            message: `Product with id ${id} was deleted`,
            values: deleted
        });
    } catch (err) {
        next(err);
    }
}
