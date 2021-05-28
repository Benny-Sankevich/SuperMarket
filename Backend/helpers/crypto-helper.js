const crypto = require("crypto");

const salt = "ThisIsVeryStrongPassword";
//Hashing Function
function hash(plainText) {
    // Hashing 
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};