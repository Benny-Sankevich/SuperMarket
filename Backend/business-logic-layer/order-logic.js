require("../data-access-layer/dal");
const OrderModel = require("../models/order-model");
const createInvoice = require("../helpers/create-invoice");

//Add new order
async function addOrderAsync(order) {
    order.invoiceNumber = `SO${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`;
    const orderAdded = await order.save();
    const informationOfOrder = await getAllInformationOfOrderAsync(orderAdded._id);
    await createInvoice(informationOfOrder);
    return orderAdded;
}
//Get information of the order to input in invoice
function getAllInformationOfOrderAsync(_id) {
    return OrderModel.findById(_id).populate("users").populate({ path: "cart", populate: { path: "product" } }).exec();
}
//Get last order per user
function getOrderByUserIdAsync(userId) {
    return OrderModel.findOne({ userId }, null, { sort: { orderDate: -1 } }).exec();
}
//Get total of orders in market
function getTotalOrdersAsync() {
    return OrderModel.countDocuments().exec();
}

//Check if have 3 same delivery date
async function checkDeliveryDateExistsAsync(deliveryDate) {
    const checkDeliveryDate = await OrderModel.find({ deliveryDate }).exec();
    if (checkDeliveryDate.length >= 3) {
        return false;
    }
    return true;
}

module.exports = {
    addOrderAsync,
    getOrderByUserIdAsync,
    getAllInformationOfOrderAsync,
    getTotalOrdersAsync,
    checkDeliveryDateExistsAsync
}