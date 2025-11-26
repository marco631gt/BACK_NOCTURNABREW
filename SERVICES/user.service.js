import { Users } from "../MODELS/user.model.js";
import bcrypt from "bcryptjs";

export async function createUser(data) {
    const exists = await Users.findOne({ email: data.email });
    if (exists !== null) {
        const err = new Error(`User with the email: ${data.email} already exists!`);
        err.status = 409; 
        throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const doc = await Users.create(data);
    const userObject = doc.toObject();
    delete userObject.password; 

    return userObject;
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
    if (newInfo.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newInfo.password, salt);
        newInfo.password = hashedPassword;
    }

    const exists = await Users.findOneAndUpdate({email}, newInfo);
    return exists;
}

export async function deleteUserByEmail(email) {
    const exists = await Users.deleteOne({"email":email});
    return exists;
}