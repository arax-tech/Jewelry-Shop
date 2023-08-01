const express = require("express")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const sendEmail = require("../include/sendEmail");



const router = express.Router()

// Middleware
const auth = require("../middleware/auth")

// Models 
const User = require("../models/User");


router.post("/register", async (request, response) => {
    try {
        const check = await User.findOne({ email: request.body.email });
        console.log(request.body.email)
        if (check) {
            response.status(500).json({
                status: 500,
                message: "Email is already taken, Please use another email...",
            });
        } else {
            const user = await User.create(request.body);

            const token = await user.generateAuthToken();
            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            const authuser = await User.findById(user._id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');
            response.status(201).json({
                status: 201,
                message: "Registration Successfully...",
                user: authuser,
                token: token
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

router.post('/login', async (request, response) => {

    try {

        const { email, password } = request.body;
        const loginUser = await User.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, loginUser.password)

        if (isMatch) {

            const token = await loginUser.generateAuthToken();

            response.cookie("token", token, {
                expires: new Date(Date.now() + process.env.JWT_EXPIRE_TOKEN * 24 * 60 * 60 * 1000),
                httpOnly: true
            });
            // console.log("cookies" + request.cookies.jwt);

            const authuser = await User.findById(loginUser._id).select('-password -tokens -resetPasswordExpire -resetPasswordToken');

            response.status(200).json({
                status: 200,
                message: "Login Successfully...",
                user: authuser,
                token: token
            })
        }
        else {
            response.status(500).json({
                status: 500,
                message: "Invalid Email OR Password..."
            })
        }

    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: "Invalid Email OR Password..."
        })
    }
})

router.get("/logout", auth, async (request, response) => {
    try {
        // Logout form current device
        request.user.tokens = request.user.tokens.filter((currentElement) => {
            return currentElement.token === request.token
        });
        // Logout from all devices
        // request.user.tokens = [];
        response.clearCookie("token");
        const user = await request.user.save();
        response.status(200).json({
            status: 200,
            message: "Logout Successfully..."
        });
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
})

router.post("/password/forgot", async (request, response) => {

    try {
        const user = await User.findOne({ email: request.body.email });

        if (!user) {
            response.status(500).json({
                status: 500,
                message: "User not found with this email..."
            })
        } else {

            // Get Reset Password Token
            const resetToken = user.getResetPasswordToken();
            await user.save({ validateBeforeSave: false });

            // const resetPasswordUrl = `${request.protocol}://${request.get("host")}/api/auth/password/reset/${resetToken}`;
            const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

            const message = `Your password reset token  is 👇 \n\n${resetPasswordUrl}\n\n\nIf you have not requested this email then, please ignore this email... \n\n\nRegard Jewlry Shop`;

            await sendEmail({
                email: user.email,
                subject: "Jewlry Shop - Password Reset",
                message
            })

            response.status(200).json({
                status: 200,
                message: `Password reset email send to ${user.email} Successfully...`
            })
        }
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        })
    }
})

router.put("/password/reset/:token", async (request, response) => {

    try {

        // Createing Token Hash

        const resetPasswordToken = crypto.createHash("sha256").update(request.params.token).digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            response.status(500).json({
                status: 500,
                message: "Reset Password Token is Invalid OR Expired..."
            })
        }
        user.password = request.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        response.status(200).json({
            status: 200,
            message: `Password Reset Successfully...`
        })
    }
    catch (error) {
        response.status(500).json({
            status: 500,
            message: error.message
        })
    }
})

module.exports = router;