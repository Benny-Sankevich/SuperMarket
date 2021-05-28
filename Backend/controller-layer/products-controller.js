const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const path = require("path");
const errorHelper = require("../helpers/errors-helper");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyIsAdmin = require("../middleware/verify-isAdmin");

const router = express.Router(); // Only the routing mechanism for our controller.

//Get all products:
router.get("/", verifyLoggedIn, async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// Get product image 
router.get("/images/:imageName", (request, response) => {
    const imageName = request.params.imageName;
    let reqPath = path.join(__dirname, "../");
    response.sendFile(reqPath + "/assets/upload/" + imageName);
});

// get All Products Per Category
router.get("/categories/:categoryId", verifyLoggedIn, async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const products = await productsLogic.getAllProductsPerCategoryAsync(categoryId);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// get All Products Per Search
router.get("/search/:userSearch", verifyLoggedIn, async (request, response) => {
    try {
        const search = request.params.userSearch;
        const productsResult = await productsLogic.getAllProductsBySearchAsync(search);
        response.json(productsResult);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

// get total products
router.get("/total-products", async (request, response) => {
    try {
        const totalProducts = await productsLogic.getTotalProductsAsync();
        response.json(totalProducts);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Add new product:
router.post("/", verifyIsAdmin, async (request, response) => {
    try {
        const product = new ProductModel(request.body);
        //Validate
        const error = product.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const addedProduct = await productsLogic.addProductAsync(product, (request.files ? request.files.image : null));
        response.status(201).json(addedProduct);
    }
    catch (err) {
        if (err.code === 11000) return response.status(400).send("Duplicate Item Already Exist");
        response.status(500).send(errorHelper.getError(err));
    }
});

//Update full product data
router.put("/:_id", verifyIsAdmin, async (request, response) => {
    try {
        const product = new ProductModel(request.body);
        product._id = request.params._id;
        //Validate
        const error = product.validateSync();
        if (error) {
            response.status(404).send(error.message);
            return;
        }
        const updatedProduct = await productsLogic.updateProductAsync(product, (request.files ? request.files.image : null));
        if (!updatedProduct) {
            response.status(404).send(`_id ${product._id} not found.`);
            return;
        }
        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;