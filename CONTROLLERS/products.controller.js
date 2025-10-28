import * as service from '../SERVICES/products.service.js'

export async function create(req, res, next) {
    try {
    const product = await service.createProduct(req.body);
    res.status(201).json(
        {

            message:"Product was created succesfully",
            values: product

        });
    } catch (err) {
        next(err);
    }
}

export async function getById(req, res, next) {
    try{
        const idToFind = req.params.id;
        const productById = await service.getProductById(idToFind);
        res.status(201).json({
            message: `Here is the product with the id ${idToFind}`,
            values: productById
        });

    } catch(err){
        next(err);
    }
}

export async function listByName(req, res, next) {
    try{
        const nameToFind = req.params.name;
        const productByName = await service.listProductByName(nameToFind);
        res.status(201).json({
            message: `Here are the products with the name ${nameToFind}`,
            values: productByName
        })
    }catch(err){
        next(err);
    }
}

export async function updateById(req, res, next) {
    try{
        let newInfo = {};
        if(req.body.name){
            newInfo.name = req.body.name;
        }
        if(req.body.price){
            newInfo.price = req.body.price;
        }
        if(req.body.category){
            newInfo.category = req.body.category;
        }
        if(req.body.description){
            newInfo.description = req.body.description;
        }
        if (req.body.hasOwnProperty('available')) {
            newInfo.available = req.body.available;
        }

        const productUpdate = await service.updateProductById(req.params.id, newInfo);
        res.status(201).json({
            message: `The produc with the id ${req.params.id} was updated`,
            values: productUpdate
        })

    }catch(err){
        next(err);
    }
}

export async function deleteById(req, res, next) {
    try{
        const producToDelete = req.params.id;
        const productDeleted = await service.deleteProductById(producToDelete);
        res.status(201).json({
            message: `The product with the id ${producToDelete} was deleted`,
            values: productDeleted
        });
    }catch(err){
        next(err);
    }
}