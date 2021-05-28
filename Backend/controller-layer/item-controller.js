const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const ItemModel = require("../models/item-model");
const itemLogic = require("../business-logic-layer/item-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();
// Verify JWT Token: 
router.use(verifyLoggedIn);

//Get all items per cart
router.get("/:cartId", async (request, response) => {
    try {
        const cartId = request.params.cartId;
        const items = await itemLogic.getAllItemsPerCartAsync(cartId);
        response.json(items);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//add new item:
router.post("/", async (request, response) => {
    try {
        const item = new ItemModel(request.body);
        //Validate
        const error = item.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const addedItem = await itemLogic.addItemAsync(item);
        response.status(201).json(addedItem);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Update item cart
router.put("/:_id", async (request, response) => {
    try {
        const item = new ItemModel(request.body);
        item._id = request.params._id;
        //Validate
        const error = item.validateSync();
        if (error) {
            response.status(404).send(error.message);
            return;
        }
        const updatedItem = await itemLogic.updateItemAsync(item);
        if (!updatedItem) {
            response.status(404).send(`_id ${updatedItem._id} not found.`);
            return;
        }
        response.status(201).json(updatedItem);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Delete item from cart
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await itemLogic.deleteItemAsync(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;