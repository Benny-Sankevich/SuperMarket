require("../data-access-layer/dal");
const uuid = require("uuid");
const fs = require("fs");
const ProductModel = require("../models/product-model");

//Get all products:
function getAllProductsAsync() {
    return ProductModel.find().exec();
}

// Get products by user search
function getAllProductsBySearchAsync(textToSearch) {
    const reg = new RegExp(textToSearch, "i")
    return ProductModel.find({ name: { $regex: reg } }).exec();
}

//Get all products by category
function getAllProductsPerCategoryAsync(categoryId) {
    return ProductModel.find({ categoryId }).exec();
}

// Add new product:
async function addProductAsync(product, image) {
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        product.imageName = uuid.v4() + extension;
        await image.mv("./assets/upload/" + product.imageName);
    }
    return product.save();
}

// Update full product: 
async function updateProductAsync(product, image) {
    if (image) {
        //Delete old image
        await fs.unlinkSync("./assets/upload/" + product.imageName);

        //Save new image
        const extension = image.name.substr(image.name.lastIndexOf("."));
        product.imageName = uuid.v4() + extension;
        await image.mv("./assets/upload/" + product.imageName);
    }
    const info = await ProductModel.updateOne({ _id: product._id }, product).exec();
    return info.n ? product : null;
}

//Get total products
function getTotalProductsAsync() {
    return ProductModel.countDocuments().exec();
}

module.exports = {
    getAllProductsAsync,
    getAllProductsBySearchAsync,
    addProductAsync,
    updateProductAsync,
    getAllProductsPerCategoryAsync,
    getTotalProductsAsync
};