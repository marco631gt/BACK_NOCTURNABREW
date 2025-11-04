import * as service from '../SERVICES/user.service.js';

export async function create(req, res, next) {
    try {
        const user = await service.createUser(req.body);
        res.status(201).json({
            message:"User was created succesfully",
            values:user
        });
    } catch (error) {
        next(error);
    }

}