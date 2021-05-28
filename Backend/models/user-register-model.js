const mongoose = require("mongoose");

//user register model
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Missing First Name."],
        minLength: [3, "First name must be minimum 3 chars."],
        maxLength: [20, "First name can`t exceed 20 chars."],
        match: [/^[A-Z].*$/, "First name  must start with a capital letter."]
    },
    lastName: {
        type: String,
        required: [true, "Missing Last Name."],
        minLength: [3, "Last name must be minimum 3 chars."],
        maxLength: [20, "Last name can`t exceed 20 chars."],
        match: [/^[A-Z].*$/, "Last name must start with a capital letter."]
    },
    userId: {
        type: String,
        required: [true, "Missing ID."],
        unique: [true, "ID is exist."],
        match: [/^\d{9}$/, "ID must be 9 digit."]
    },
    email: {
        type: String,
        required: [true, "Missing Email."],
        unique: [true, "Email already exist."],
        match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email must be valid."]
    },
    password: {
        type: String,
        required: [true, "Missing Password."],
        minLength: [8, "Password must be minimum 8 chars."],
        maxLength: [5000, "Password can`t exceed 5000 chars."]
    },
    city: {
        type: String,
        required: [true, "Missing City."],
        minLength: [2, "City must be minimum 2 chars."],
        maxLength: [20, "City can`t exceed 20 chars."],
        match: [/^[A-Z].*$/, "City must start with a capital letter."]
    },
    street: {
        type: String,
        required: [true, "Missing Street."],
        minLength: [3, "Street must be minimum 3 chars."],
        maxLength: [30, "Street can`t exceed 30 chars."],
        match: [/^[A-Z].*$/, "Street must start with a capital letter."]
    },
    isAdmin: {
        type: String,
        default: "no"
    },
    token: {
        type: String,
    },
},
    {
        versionKey: false,
        id: false
    });

// Creating user model: 
const UserRegisterModel = mongoose.model("UserRegisterModel", UserSchema, "users"); // class name, schema, collection

module.exports = UserRegisterModel;