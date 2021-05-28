require("../data-access-layer/dal");
const CartModel = require("../models/cart-model");

// Add new cart:
function addCartAsync(cart) {
    return cart.save();
}
//Get last cart by user
function getCartByUserIdAsync(userId) {
    return CartModel.findOne({ $and: [{ userId }, { isOpenCart: true }] }, null, { sort: { creationDate: -1 } }).exec();
}

// Update full cart: 
async function updateCartAsync(cart) {
    const info = await CartModel.updateOne({ _id: cart._id }, cart).exec();
    return info.n ? cart : null;
}

module.exports = {
    addCartAsync,
    getCartByUserIdAsync,
    updateCartAsync
}