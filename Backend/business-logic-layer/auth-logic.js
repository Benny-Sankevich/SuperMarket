require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");
const UserLoginModel = require("../models/user-login-model");

//Register Function 
async function registerAsync(user) {

    // Hash user password: 
    user.password = cryptoHelper.hash(user.password);

    const newUser = await user.save();

    newUser.token = jwtHelper.getNewToken({ user });
    // Delete the old password: 
    newUser.password = undefined;

    return newUser;
}

//Login Function
async function loginAsync(email, password) {

    // Hash user password: 
    password = cryptoHelper.hash(password);
    const user = await UserLoginModel.find({ $and: [{ email }, { password }] }).exec();
    if (user.length == 0) return null;
    user[0].token = jwtHelper.getNewToken({ user });
    user[0].password = undefined;
    return user[0];
}

//Check if an user Id already exists
function checkUserIdExistAsync(userId) {
    return UserLoginModel.findOne({ userId }).exec();
}

//Check if an email already  exists
function checkEmailExistAsync(email) {
    return UserLoginModel.findOne({ email }).exec();
}

module.exports = {
    registerAsync,
    loginAsync,
    checkEmailExistAsync,
    checkUserIdExistAsync
};