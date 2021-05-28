const mongoose = require("mongoose");

//items cart model
const ItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing product id."],
        ref: "ProductModel"
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing cart id."],
        ref: "CartModel"
    },
    amount: {
        type: Number,
        required: [true, "Missing amount."],
        min: [0, "Amount can`t be negative."],
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Price can`t be negative."],
    },
    totalPrice: {
        type: Number,
        required: [true, "Missing total price."],
        min: [0, "Total price can`t be negative."],
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    });

ItemSchema.virtual("product", {
    ref: "ProductModel",
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

const ItemModel = mongoose.model("ItemModel", ItemSchema, "items");

module.exports = ItemModel;