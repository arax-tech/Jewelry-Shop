const express = require("express")

const router = express.Router();

// Middleware
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")

// Model
const Product = require("../../models/Product")



router.get("/:id", auth, admin, async (request, response) => {
    try {

        const product = await Product.findById(request.params.id);
        if (product.reviews.length === 0) {
            response.status(404).json({
                status: 404,
                message: "Product have no reviews..."
            });
        }
        else {
            response.status(200).json({
                status: 200,
                reviews: product.reviews
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



router.delete("/delete/:product_id/:id", auth, admin, async (request, response) => {
    try {


        // console.log(request.params);        

        const product = await Product.findById(request.params.product_id);
        if (!product) {
            response.status(404).json({
                status: 404,
                message: "Product not Found..."
            });
        }


        const reviews = product.reviews.filter(
            (rev0) => rev0._id.toString() !== request.params.id.toString());


        let avg = 0;
        reviews.forEach((rev1) => {
            avg += rev1.rating;
        })

        let ratings = 0;
        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }
        const numberOfReviews = reviews.length;

        await Product.findByIdAndUpdate(request.params.product_id, { reviews, ratings, numberOfReviews }, { new: true, runValidators: true, useFindAndModify: false });

        await product.save({ validateBeforeSave: false })

        response.status(200).json({
            status: 200,
            message: "Review Delete Successfully...",

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