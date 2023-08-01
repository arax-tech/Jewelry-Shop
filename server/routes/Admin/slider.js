const express = require("express")

const multer = require("multer")
const fs = require("fs")
const path = require("path")

const router = express.Router()

// const upload = multer({ dest: "public/images/products" })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/sliders')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, "slider" + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const Slider = require("../../models/Slider")

router.get("/", auth, admin, async (request, response) => {
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
router.get("/:id", auth, admin, async (request, response) => {
    try {
        const _id = request.params.id;
        const slider = await Slider.findById(_id);
        response.status(200).json({
            status: 200,
            slider: slider
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.post("/store", auth, admin, upload.single('image'), async (request, response) => {
    try {

        request.body.image = `${request.protocol}://${request.get('host')}/images/sliders/${request.file.filename}`;

        await Slider.create(request.body);
        response.status(200).json({
            status: 200,
            message: "Slider Created Successfully..."
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});
router.patch("/update/:id", auth, admin, upload.single('image'), async (request, response) => {
    try {
        const _id = request.params.id;
        const slider = await Slider.findById(_id);

        if (request.file) {
            const oldImage = `images${slider.image.split("/images")[1]}`
            if (oldImage) {
                fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
            }
            request.body.image = `${request.protocol}://${request.get('host')}/images/sliders/${request.file.filename}`;
        } else {
            request.body.image = slider.image
        }


        await Slider.findByIdAndUpdate(_id, request.body);
        response.status(200).json({
            status: 200,
            message: "Slider Updated Successfully..."
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});
router.delete("/delete/:id", auth, admin, async (request, response) => {
    try {
        const _id = request.params.id;
        const slider = await Slider.findById(_id);

        const oldImage = `images${slider.image.split("/images")[1]}`
        fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))

        await Slider.findByIdAndDelete(_id);
        response.status(200).json({
            status: 200,
            message: "Slider Deleted Successfully..."
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }

});


module.exports = router;
