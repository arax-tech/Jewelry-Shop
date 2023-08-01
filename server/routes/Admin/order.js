const express = require("express")
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")

// Model
const Order = require("../../models/Order");
const Product = require("../../models/Product");



router.get("/", auth, admin, async (request, response) => {
    try {

        const orders = await Order.find().populate("user_id", "name email image");
        response.status(200).json({
            status: 200,
            orders: orders,
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})



router.get("/:id", auth, admin, async (request, response) => {
    try {

        const order = await Order.findById(request.params.id).populate("user_id", "name email image");

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


router.patch("/update/:id", auth, admin, async (request, response) => {
    try {

        const order = await Order.findById(request.params.id);

        if (order.orderStatus === "Delivered") {
            response.status(500).json({
                status: 500,
                message: "This Order is Already Delivered..."
            });

        }
        else {
            if (request.body.status === "Delivered") {
                order.orderedItems.forEach(async (order) => {
                    const product = await Product.findById(order.product_id);
                    product.stock -= order.product_quantity;
                    await product.save({ validateBeforeSave: false })
                })
            }

            order.orderStatus = request.body.status;
            if (request.body.status === "Delivered") {
                order.deliverAt = Date.now()
            }

            await order.save({ validateBeforeSave: false });
            response.status(200).json({
                status: 200,
                message: "Order Updated Successfully..."
            });
        }

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.delete("/delete/:id", auth, admin, async (request, response) => {
    try {

        const order = await Order.findByIdAndDelete(request.params.id);

        response.status(200).json({
            status: 200,
            message: "Order Delete Successfully..."
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