import { Users } from "../MODELS/user.model.js";

export async function createUser(data) {
    console.log(data);
    const exists = await Users.findOne({email:data.email});
    if (exists !== null){
        const err = new Error (`User with th email: ${data.email} already exists !`);
        err.status = 409; //Error de recurso ocupado o duplicado
        throw err;
    }
    const doc = await Users.create(data);
    return doc.toObject();
}

export async function getAllUsers() {
    try {
        const users = await Users.find(); 
        return users;
    } catch (err) {
        throw new Error('Error fetching all users: ' + err.message);
    }
}

export async function getUserByEmail(email) {
    const exists = await Users.findOne({"email":email});
    return exists;
}

export async function updateUserByEmail(email, newInfo) {
    const exists = await Users.findOneAndUpdate({email}, newInfo);
    return exists;
}

export async function deleteUserByEmail(email) {
    const exists = await Users.deleteOne({"email":email});
    return exists;
}