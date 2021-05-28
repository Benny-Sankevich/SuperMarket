global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const imageUpload = require("express-fileupload");
const path = require("path");
const authController = require("./controller-layer/auth-controller");
const productsController = require("./controller-layer/products-controller");
const categoriesController = require("./controller-layer/categories-controller")
const cartsController = require("./controller-layer/cart-controller");
const itemsController = require("./controller-layer/item-controller");
const orderController = require("./controller-layer/order-controller");

const server = express();
server.use(cors());
server.use(imageUpload());
server.use(express.json());
// server.use(express.static(path.join(__dirname, "./frontend")));

//Routing
server.use("/api/auth", authController);
server.use("/api/products", productsController);
server.use("/api/categories", categoriesController);
server.use("/api/carts", cartsController);
server.use("/api/items", itemsController);
server.use("/api/orders", orderController);

server.use("*", (request, response) => {
    if (process.env.NODE_ENV === "production") {
        response.sendFile(path.join(__dirname, "./frontend/index.html"));
    }
    else {
        response.status(404).send("Route not found");
    }
});

//listening to environment Port on production or 3001 on developing;
const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening...."));