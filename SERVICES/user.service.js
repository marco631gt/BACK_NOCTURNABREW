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