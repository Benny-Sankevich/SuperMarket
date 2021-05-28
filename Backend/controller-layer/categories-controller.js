const express = require("express");
const errorHelper = require("../helpers/errors-helper");
const categoriesLogic = require("../business-logic-layer/categories-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

// Verify JWT Token: 
router.use(verifyLoggedIn);

// GET /api/categories - get all categories:
router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategoriesAsync();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;