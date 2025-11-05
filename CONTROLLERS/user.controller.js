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

export async function getAll(req, res, next) {
    try {
        const users = await service.getAllUsers();
        res.status(200).json({
            message: "Here are all the users",
            values: users
        });
    } catch (err) {
        next(err);
    }
}

export async function getByEmail(req, res, next) {
    try{
        const emailToFind = req.params.email;
        const userByEmail = await service.getUserByEmail(emailToFind);
        res.status(201).json({
            message: `Here is the user with the email ${emailToFind}`,
            values: userByEmail
        });

    } catch(err){
        next(err);
    }
}

export async function updateByEmail(req, res, next) {
    try{
        let newInfo = {};
        if(req.body.name){
            newInfo.name = req.body.name;
        }
        if(req.body.email){
            newInfo.email = req.body.email;
        }
        if(req.body.password){
            newInfo.password = req.body.password;
        }
        if(req.body.role){
            newInfo.role = req.body.role;
        }

        const userUpdate = await service.updateUserByEmail(req.params.email, newInfo);
        res.status(201).json({
            message: `The user with the email ${req.params.email} was updated`,
            values: userUpdate
        })

    }catch(err){
        next(err);
    }
}

export async function deleteByEmail(req, res, next) {
    try{
        const userToDelete = req.params.email;
        const userDeleted = await service.deleteUserByEmail(userToDelete);
        res.status(201).json({
            message: `The user with the id ${userToDelete} was deleted`,
            values: userDeleted
        });
    }catch(err){
        next(err);
    }
}