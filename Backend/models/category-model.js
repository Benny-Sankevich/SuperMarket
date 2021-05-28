const mongoose = require("mongoose");

//category model
const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Missing category name."],
        minLength: [2, "Category Name must be minimum 2 chars."],
        maxLength: [20, "Category Name can`t exceed 20 chars."],
        match: [/^[A-Z].*$/, "Category Name must start with a capital letter."]
    }
},
    {
        versionKey: false,
        id: false
    });

const CategoryModel = mongoose.model("CategoryModel", CategorySchema, "categories");

module.exports = CategoryModel;