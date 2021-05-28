const jwt = require("jsonwebtoken");

const key = "ThisIsVeryStrongToken";
//Create Token for user
function getNewToken(payload) {
    return jwt.sign(payload, key, { expiresIn: "30m" });
}

module.exports = {
    getNewToken
};