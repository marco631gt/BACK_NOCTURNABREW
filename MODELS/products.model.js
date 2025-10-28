import mongoose, {version} from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true,
    },
    name:{
        type: String,
        require: true,
        unique: true
    },
    price:{
        type: Number,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    available:{
        type: Boolean,
        require: true
    }
})

export const Products = mongoose.model('Products', productSchema, 'Products');