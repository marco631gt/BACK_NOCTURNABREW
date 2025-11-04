import mongoose, {version} from "mongoose";

const userSchema = new mongoose.Schema({
    nombre:{
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
    rol:{
        type: String,
        require: false,
    }
}) 

export const Users = mongoose.model('Users', userSchema, 'Users')