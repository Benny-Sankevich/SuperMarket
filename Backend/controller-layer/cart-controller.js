const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const CartModel = require("../models/cart-model");
const cartsLogic = require("../business-logic-layer/carts-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// Verify JWT Token: 
router.use(verifyLoggedIn);

// GET /api/carts/_id - get cart by userId
router.get("/:userId", async (request, response) => {
    try {
        const userId = request.params.userId;
        const cart = await cartsLogic.getCartByUserIdAsync(userId);
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// POST /api/carts - add new cart:
router.post("/", async (request, response) => {
    try {
        const cart = new CartModel(request.body);
        //Validate
        const error = cart.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const addedCart = await cartsLogic.addCartAsync(cart);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Update full cart data (close status cart)
router.put("/:_id", async (request, response) => {
    try {
        const cart = new CartModel(request.body);
        cart._id = request.params._id;
        //Validate
        const error = cart.validateSync();
        if (error) {
            response.status(404).send(error.message);
            return;
        }
        const updatedCart = await cartsLogic.updateCartAsync(cart);
        if (!updatedCart) {
            response.status(404).send(`_id ${updatedCart._id} not found.`);
            return;
        }
        response.status(201).json(updatedCart);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;