const express = require("express")

const router = express.Router();

// Middleware
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")

// Model
const Order = require("../../models/Order")
const Product = require("../../models/Product")



router.get("/", auth, user, async (request, response) => {
    try {

        const orders = await Order.find({ user_id: request.user.id }).populate("user_id", "name email image");
        response.status(200).json({
            status: 200,
            orders: orders
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.get("/:id", async (request, response) => {
    try {
        const _id = request.params.id;

        const order = await Order.findById(_id).populate("user_id", "name email image");

        response.status(200).json({
            status: 200,
            order: order
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.post("/store", auth, user, async (request, response) => {
    try {
        const { shippingInfo, orderedItems, paymentInfo, subTotal, shippingPrice, grandTotal } = request.body.order;

        const order = new Order({
            user_id: request.user.id,
            shippingInfo,
            orderedItems,
            paymentInfo,
            subTotal,
            shippingPrice,
            grandTotal,
            paidAt: Date.now()
        });

        await order.save();

        response.status(201).json({
            status: 201,
            message: "Order Placed Successfully..."
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



module.exports = router;