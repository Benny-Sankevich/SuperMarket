const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const OrderModel = require("../models/order-model");
const orderLogic = require("../business-logic-layer/order-logic");
const path = require("path");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// get total orders
router.get("/total-orders", async (request, response) => {
    try {
        const totalOrders = await orderLogic.getTotalOrdersAsync();
        response.json(totalOrders);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Get last order of user
router.get("/order/:userId", verifyLoggedIn, async (request, response) => {
    try {
        const userId = request.params.userId;
        const order = await orderLogic.getOrderByUserIdAsync(userId);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Get invoice 
router.get("/invoices/:invoiceId", (request, response) => {
    const invoiceName = request.params.invoiceId;
    let reqPath = path.join(__dirname, "../");
    response.sendFile(reqPath + "/assets/invoices/" + invoiceName);
});

//add new order:
router.post("/", verifyLoggedIn, async (request, response) => {
    try {
        const order = new OrderModel(request.body);
        //Validate
        const error = order.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const addedOrder = await orderLogic.addOrderAsync(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Check if an user ID  exists
router.post("/check-delivery-date", async (request, response) => {
    try {
        const { deliveryDate } = request.body;
        const existDeliveryDate = await orderLogic.checkDeliveryDateExistsAsync(deliveryDate);
        response.json(existDeliveryDate);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;