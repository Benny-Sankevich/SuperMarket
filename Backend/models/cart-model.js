const mongoose = require("mongoose");

//cart model
const CartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Missing user ID."],
        ref: "UserRegisterModel"
    },
    creationDate: {
        type: Date,
        required: [true, "Missing creation date."]
    },
    isOpenCart: {
        type: Boolean,
        required: [true, "Missing cart status."]
    }
},
    {
        versionKey: false,
        toJSON: { virtuals: true },
        id: false
    });

CartSchema.virtual("items", {
    ref: "ItemModel",
    localField: "_id",
    foreignField: "cartId"
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;