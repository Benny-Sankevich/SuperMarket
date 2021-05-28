require("../data-access-layer/dal");
const ItemModel = require("../models/item-model");

//Get all items per cart
function getAllItemsPerCartAsync(cartId) {
    return ItemModel.find({ cartId }).populate("product").exec();
}

// Add new item in cart:
function addItemAsync(item) {
    return item.save();
}

// Update full item in cart: 
async function updateItemAsync(item) {
    const info = await ItemModel.updateOne({ _id: item._id }, item).exec();
    return info.n ? item : null;
}

// Delete item from cart:
function deleteItemAsync(_id) {
    return ItemModel.deleteOne({ _id }).exec();
}

module.exports = {
    getAllItemsPerCartAsync,
    addItemAsync,
    updateItemAsync,
    deleteItemAsync
}