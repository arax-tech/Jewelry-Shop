const express = require("express")
const bcrypt = require("bcryptjs")

const crypto = require("crypto")

const router = express.Router();




// Middleware
const auth = require("../../middleware/auth")
const admin = require("../../middleware/admin")

// Model
const User = require("../../models/User")


router.get("/", auth, admin, async (request, response) => {
    try {
        const users = await User.find().select('-password -tokens -resetPasswordExpire -resetPasswordToken');
        response.status(200).json({
            status: 200,
            users: users
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


router.patch("/update/:id", auth, admin, async (request, response) => {
    try {

        const _id = request.params.id;
        await User.findByIdAndUpdate(_id, request.body, { new: true });
        response.status(200).json({
            status: 200,
            message: "Role Updated Successfully..."
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
        await User.findByIdAndDelete(_id);
        response.status(200).json({
            status: 200,
            message: "User Deleted Successfully..."
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