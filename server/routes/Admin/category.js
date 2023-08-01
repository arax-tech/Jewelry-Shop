const express = require("express")
const fs = require("fs")
const path = require("path")

const router = express.Router();

const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/categories')
    },
    filename: function (req, file, cb) {

        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, "categroy" + '-' + Date.now() + '.' + extension)
    }
})

const upload = multer({ storage: storage })


// Model
const Category = require("../../models/Category")

// Middleware
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin");




router.get("/", auth, admin, async (request, response) => {
    try {
        const categories = await Category.find();
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


router.get("/:id", auth, admin, async (request, response) => {
    try {
        const _id = request.params.id;
        const category = await Category.findById(_id);
        response.status(200).json({
            status: 200,
            category: category
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/store", upload.single('image'), auth, admin, async (request, response) => {
    try {
        request.body.image = `${request.protocol}://${request.get('host')}/images/categories/${request.file.filename}`;
        await Category.create(request.body);
        response.status(201).json({
            status: 201,
            message: "Category Created Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})

router.patch("/update/:id", upload.single('image'), auth, admin, async (request, response) => {
    try {

        const _id = request.params.id;
        const category = await Category.findById(_id);
        if (request.file) {
            const oldImage = `images${category.image.split("/images")[1]}`
            if (oldImage) {
                fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
            }
            request.body.image = `${request.protocol}://${request.get('host')}/images/categories/${request.file.filename}`;
        } else {
            request.body.image = category.image

        }

        await Category.findByIdAndUpdate(_id, request.body);
        response.status(200).json({
            status: 200,
            message: "Category Updated Successfully...",
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
        const category = await Category.findByIdAndDelete(_id);

        const oldImage = `images${category.image.split("/images")[1]}`
        fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))

        response.status(200).json({
            status: 200,
            message: "Category Deleted Successfully..."
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