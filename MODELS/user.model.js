import mongoose, {version} from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true,

    },
    password:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        require: false,
        default: "customer",
    }
}) 

export const Users = mongoose.model('Users', userSchema, 'Users')