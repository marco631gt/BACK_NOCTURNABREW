import mongoose, {version} from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    available:{
        type: Boolean,
        required: true
    }
})

export const Products = mongoose.model('Products', productSchema, 'Products');