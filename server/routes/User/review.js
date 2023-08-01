const express = require("express")
const router = express.Router();

// Middleware
const auth = require("../../middleware/auth")
const user = require("../../middleware/user")

// Model
const Product = require("../../models/Product")



router.post("/store", auth, user, async (request, response) => {

    try {
        let message = "";

        const { product_id, comment, rating } = request.body;
        const review = {
            user_id: request.user.id,
            name: request.user.name,
            image: request.user.image,
            rating: Number(rating),
            comment
        };
        const product = await Product.findById(product_id);
        const isReviewed = product.reviews.find((rev) => rev.user_id.toString() === request.user.id.toString());
        if (isReviewed) {
            product.reviews.forEach((revs) => {
                if (revs.user_id.toString() === request.user.id.toString()) {
                    revs.rating = rating,
                        revs.comment = comment,
                        revs.image = request.user.image
                }

            });
            message = "Review Updated Successfully..."
        }
        else {
            product.reviews.push(review);
            product.numberOfReviews = product.reviews.length

            message = "Review Created Successfully..."
        }

        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating;
        })
        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false })

        response.status(201).json({
            status: 201,
            message: message
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