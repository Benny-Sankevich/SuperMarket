const easyinvoice = require('easyinvoice');
const fs = require("fs");

//create invoice of order and save in local folder
async function createInvoice(invoiceData) {
    let products = [];
    //Set the parameters in array
    invoiceData.cart.forEach(c => {
        const prod = {
            "quantity": c.amount,
            "description": c.product.name,
            "tax": 17,
            "price": c.price
        }
        products.push(prod);
    });

    const data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat",
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://i.pinimg.com/originals/5b/5b/68/5b5b68ddf9de812ffc941238e66049ac.png",

        "sender": {
            "company": "Super Market Online",
            "address": "Herzl Street 93",
            "zip": "03-5369854",
            "city": "Bnei Brak",
            "country": "Israel",
            "email": "test@gmail.com"
        },
        "client": {
            "company": invoiceData.users.firstName + " " + invoiceData.users.lastName,
            "address": invoiceData.users.street,
            "zip": "Entrance A",
            "city": invoiceData.users.city,
            "country": "Israel",
        },
        "invoiceNumber": invoiceData.invoiceNumber,
        "invoiceDate": new Date(invoiceData.orderDate).toDateString(),
        "products": products,
        "bottomNotice": `Delivery Date:${new Date(invoiceData.deliveryDate).toDateString()}.<br>
                         Delivery address: ${invoiceData.street} ${invoiceData.city}.<br>
                         Credit Card: XXXX-XXXX-XXXX-${invoiceData.fourDigitsCreditCard}`
    };

    //Create the invoice and save in the local folder
    easyinvoice.createInvoice(data, async function (result) {
        await fs.writeFileSync(`./assets/invoices/${invoiceData._id}.pdf`, result.pdf, 'base64');
    });
}

module.exports = createInvoice;