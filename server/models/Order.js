const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    shippingInfo: {
        phone: { type: String, required: true },
        postCode: { type: String, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
    },
    orderedItems: [
        {
            product_id: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
            product_name: { type: String, required: true },
            product_price: { type: Number, required: true },
            product_quantity: { type: Number, required: true },
            product_size: { type: String, required: true },
            product_color: { type: String, required: true },
            product_image: { type: String, required: true },
        }
    ],

    paymentInfo: {
        id: { type: String, required: true },
        amount: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
        create_time: { type: String, required: true },
        paymentJson: { type: String, required: true },
    },

    subTotal: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    orderStatus: { type: String, required: true, default: "Processing" },
    deliverAt: { type: Date },
    paidAt: { type: Date, required: true },
    createAt: { type: Date, default: Date.now }
})


// Model
const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;