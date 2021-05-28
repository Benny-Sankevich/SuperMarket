const mongoose = require("mongoose");

//products model
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing Name."],
        unique: [true, "Product name is exist."],
        minLength: [2, "Name must be minimum 2 chars."],
        maxLength: [20, "Name can`t exceed 20 chars."],
        match: [/^[A-Z].*$/, "Name  must start with a capital letter."]
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Pice can`t be negative."]
    },
    imageName: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryModel"
    }
},
    {
        versionKey: false,
        id: false
    });

//Creating product model
const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;