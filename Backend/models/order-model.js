const mongoose = require("mongoose");

//order model
const OrderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRegisterModel"
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartModel"
    },
    price: {
        type: Number,
        required: [true, "Missing price."],
        min: [0, "Pice can`t be negative."],
    },
    city: {
        type: String,
        required: [true, "Missing City."],
        minLength: [2, "City must be minimum 2 chars."],
        maxLength: [20, "City can`t exceed 50 chars."]
    },
    street: {
        type: String,
        required: [true, "Missing Street."],
        minLength: [3, "Street must be minimum 3 chars."],
        maxLength: [30, "Street can`t exceed 30 chars."]
    },
    deliveryDate: {
        type: Date,
        require: [true, "Missing delivery date."]
    },
    orderDate: {
        type: Date,
        required: [true, "Missing order date."]
    },
    fourDigitsCreditCard: {
        type: String,
        required: [true, "Missing four digits credit card."],
        minLength: [4, "Four digits credit card can only be 4 digits."],
        maxLength: [4, "Four digits credit card can only be 4 digits."]
    },
    invoiceNumber: {
        type: String,
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    });

OrderSchema.virtual("users", {
    ref: "UserRegisterModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

OrderSchema.virtual("cart", {
    ref: "ItemModel",
    localField: "cartId",
    foreignField: "cartId",
});

const OrderModel = mongoose.model("OrderModel", OrderSchema, "orders");

module.exports = OrderModel;