const express = require("express");
const router = express.Router();

// Functions
const Filter = require("../include/filteration");

// Model
const Category = require("../models/Category")
const Product = require("../models/Product")
const Slider = require("../models/Slider")
const Banner = require("../models/Banner");



// Sliders
router.get("/sliders", async (request, response) => {
    try {

        const sliders = await Slider.find();
        response.status(200).json({
            status: 200,
            sliders: sliders
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// Banners
router.get("/banners", async (request, response) => {
    try {

        const banners = await Banner.find();
        response.status(200).json({
            status: 200,
            banners: banners
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// Categories
router.get("/categories", async (request, response) => {
    try {

        const categories = await Category.aggregate([
            {
                $lookup:
                {
                    from: 'products',
                    localField: "_id",
                    foreignField: "category",
                    as: 'products'
                }
            },
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    image: 1,
                    number_of_product: { $size: "$products" }
                }
            }
        ], function (err, result) {
            if (err) throw err;
            // console.log(result);
        });
        response.status(200).json({
            status: 200,
            categories: categories
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// Category By Slug
router.get("/category/:slug", async (request, response) => {
    try {
        const slug = request.params.slug;
        const category = await Category.findOne({ slug: slug });
        if (category == null) {
            response.status(200).json({
                status: 404,
                message: "This category don't have products"
            });

        } else {
            const categroyProducts = await Product.find({ category: category.id }).populate("category", "name");

            response.status(200).json({
                status: 200,
                categroyProducts: categroyProducts,
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

// Products
router.get("/products", async (request, response) => {
    try {
        const products = await Product.find().populate("category", "name");




        response.status(200).json({
            status: 200,
            products: products
        });


    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// Search Products
router.get("/product/search/:keyword", async (request, response) => {
    try {
        const keyword = request.params.keyword;
        const name = new RegExp(keyword, "i");
        const products = await Product.find({ name }).populate("category", "name");

        response.status(200).json({
            status: 200,
            products: products
        });


    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// onSaleProducts
router.get("/onSaleProducts", async (request, response) => {
    try {
        const onSaleProducts = await Product.find({ onSale: "Yes" }).populate("category", "name");

        response.status(200).json({
            status: 200,
            onSaleProducts: onSaleProducts
        });


    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

// Future Products
router.get("/futureProducts", async (request, response) => {
    try {
        const futureProducts = await Product.find({ futureProduct: "Yes" }).populate("category", "name");

        response.status(200).json({
            status: 200,
            futureProducts: futureProducts
        });


    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})
// Shop Products
router.get("/shopProducts", async (request, response) => {
    try {

        const resultPerPage = 9;
        const filter = new Filter(Product.find().populate("category", "name"), request.query).search().category_and_price().pagination(resultPerPage);
        products = await filter.query;
        const productsCount = await Product.countDocuments();

        const categories = await Category.aggregate([
            {
                $lookup:
                {
                    from: 'products',
                    localField: "_id",
                    foreignField: "category",
                    as: 'products'
                }
            },
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    number_of_product: { $size: "$products" }
                }
            }
        ], function (err, result) {
            if (err) throw err;
            // console.log(result);
        });

        const totalCategories = await Category.countDocuments();

        response.status(200).json({
            status: 200,
            shopProducts: products,
            resultPerPage,
            productsCount,
            shopCategories: categories,
            totalCategories

        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


// Product Details
router.get("/product/:id", async (request, response) => {
    try {
        const product = await Product.findById({ _id: request.params.id }).populate("category", "name");
        const relatedProducts = await Product.find({ category: product.category._id }).populate("category", "name");

        response.status(200).json({
            status: 200,
            product: product,
            relatedProducts: relatedProducts,
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