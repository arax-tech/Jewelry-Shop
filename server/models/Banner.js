const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    tag: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
})


// Model
const Banner = new mongoose.model("Banner", bannerSchema);
module.exports = Banner;