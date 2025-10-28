import { Products } from '../MODELS/products.model.js';

export async function createProduct(data) {
    const nameExists = await Products.findOne({name:data.name});
    const idExists = await Products.findOne({id:data.id});
    if (nameExists !== null){
        const err = new Error (`The product ${data.name} already exists`);
        err.status = 409;
        throw err;
    }
    if (idExists !== null){
        const err = new Error (`It already exists a product wit the id: ${data.id}`);
        err.status = 409;
        throw err;
    }
    const doc = await Products.create(data);
    return doc.toObject();
}  

export async function getProductById(id) {
    const exists = await Products.findOne({"id":id});
    return exists;
}

export async function listProductByName(name) {
    const exists = await Products.find({"name":name});
    return exists;
}

export async function updateProductById(id, newInfo) {
    const exists = await Products.findOneAndUpdate({id}, newInfo);
    return exists;
}

export async function deleteProductById(id) {
    const exists = await Products.deleteOne({"id":id});
    return exists;
}