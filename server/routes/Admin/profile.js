const express = require("express")

const multer = require("multer")
const fs = require("fs")
const path = require("path")

const router = express.Router()

// const upload = multer({ dest: "public/images/products" })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/admin')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];

        cb(null, "admin" + '-' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

// Middlewares
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")


// Model 
const User = require("../../models/User")

router.get("/profile", auth, admin, async (request, response) => {
    try {
        const _id = request.user.id;
        const user = await User.findById(_id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');
        response.status(200).json({
            status: 200,
            user: user
        });

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        });
    }
})


router.patch("/profile", auth, admin, upload.single('image'), async (request, response) => {
    try {
        const _id = request.user.id;

        const admin = await User.findById(_id);
        if (request.file) {
            if (admin.image) {
                const oldImage = `images${admin.image.split("/images")[1]}`
                if (oldImage) {
                    fs.unlinkSync(path.join(__dirname, "../../public/" + oldImage))
                }
            }
            request.body.image = `${request.protocol}://${request.get('host')}/images/admin/${request.file.filename}`;
        } else {
            request.body.image = admin.image
        }
        await User.findByIdAndUpdate(_id, request.body,);
        response.status(200).json({
            status: 200,
            message: "Profile Updated Successfully..."
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
