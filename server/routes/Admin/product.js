const express = require("express")
const fs = require("fs")
const path = require("path")
const multer = require("multer")

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, "product" + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


// Models 
const Product = require("../../models/Product")

// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


router.get("/", auth, admin, async (request, response) => {
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


router.get("/:id", auth, admin, async (request, response) => {
    try {
        const _id = request.params.id;
        const product = await Product.findById(_id);
        response.status(200).json({
            status: 200,
            product: product
        })
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/store", upload.array('images'), auth, admin, async (request, response) => {

    try {

        console.log(request.body);

        let colors = request.body.colors.split(',');
        let sizes = request.body.sizes.split(',');

        let images = [];
        if (request.files.length > 0) {
            images = request.files.map((file) => {
                return { image: `${request.protocol}://${request.get('host')}/images/products/${file.filename}` }
            });
        }


        await Product.create({
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            stock: request.body.stock,
            onSale: request.body.onSale,
            salePercentage: request.body.salePercentage,
            futureProduct: request.body.futureProduct,
            colors,
            sizes,
            images,
            description: request.body.description
        });
        response.status(201).json({
            status: 201,
            message: "Product Created Successfully...",
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.patch("/update/:id", upload.array('images'), auth, admin, async (request, response) => {

    try {

        const _id = request.params.id;
        const product = await Product.findById(_id);

        console.log(request.body)

        let colors = [];
        if (request.body.colors) {
            colors = request.body.colors.split(',');
        } else {
            colors: product.colors;
        }



        let sizes = [];
        if (request.body.sizes) {
            sizes = request.body.sizes.split(',');
        } else {
            sizes: product.sizes;
        }



        let images = [];

        if (request.files.length > 0) {
            if (product.images[0]) {
                product.images.map((file) => {
                    const oldImage = `images${file.image.split("/images")[1]}`
                    fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
                });
            }
            images = request.files.map((file) => {
                return { image: `${request.protocol}://${request.get('host')}/images/products/${file.filename}` }
            });
        } else {
            images = product.images;
        }

        await Product.findByIdAndUpdate(_id, {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            stock: request.body.stock,
            onSale: request.body.onSale,
            salePercentage: request.body.salePercentage,
            futureProduct: request.body.futureProduct,
            images,
            colors,
            sizes,
            description: request.body.description
        });
        response.status(200).json({
            status: 200,
            message: "Product Updated Successfully..."
        });
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
        const _id = request.params.id;
        const product = await Product.findById(_id);

        if (product.images[0]) {
            product.images.map((file) => {
                const oldImage = `images${file.image.split("/images")[1]}`
                fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
            });
        }

        await Product.findByIdAndDelete(_id);
        response.status(200).json({
            status: 200,
            message: "Product Deleted Successfully..."
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