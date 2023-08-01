const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
})


// Model
const Slider = new mongoose.model("Slider", sliderSchema);
module.exports = Slider;