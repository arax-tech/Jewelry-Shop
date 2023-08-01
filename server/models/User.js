const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    role: { type: String, default: "User", },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    createAt: { type: Date, default: Date.now }
})



// Password Hasing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

// Generating Auth Token

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (error) {
        console.log(error);
    }
}

// Generate Reset Password Token 
userSchema.methods.getResetPasswordToken = function () {

    // Generating Token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing & Adding to ResetPasswordToken in userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Expire Token after 10 Minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //Minutes 10 / Second 60 / Milisecond 1000

    return resetToken;

}

// Model
const User = new mongoose.model("User", userSchema);
module.exports = User;