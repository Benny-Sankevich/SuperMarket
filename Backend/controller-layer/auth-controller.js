const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const errorHelper = require("../helpers/errors-helper");
const UserRegisterModel = require("../models/user-register-model");
const UserLoginModel = require("../models/user-login-model");

const router = express.Router();

//Add new user
router.post("/register", async (request, response) => {
    try {
        const user = new UserRegisterModel(request.body);
        //Validate
        const error = user.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const addedUser = await authLogic.registerAsync(user);
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Login user
router.post("/login", async (request, response) => {
    try {
        const user = new UserLoginModel(request.body);
        //Validate
        const error = user.validateSync();
        if (error) {
            response.status(400).send(error.message);
            return;
        }
        const loggedInUser = await authLogic.loginAsync(user.email, user.password);
        if (!loggedInUser) return response.status(401).send("Incorrect username or password.");
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Check if an user Id  exists
router.post("/check-id", async (request, response) => {
    try {
        const { userId } = request.body;
        const existId = await authLogic.checkUserIdExistAsync(userId);
        response.json(existId);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

//Check if an user ID  exists
router.post("/check-email", async (request, response) => {
    try {
        const { email } = request.body;
        const existEmail = await authLogic.checkEmailExistAsync(email);
        response.json(existEmail);
    }
    catch (err) {
        response.status(500).send(errorHelper.getError(err));
    }
});

module.exports = router;