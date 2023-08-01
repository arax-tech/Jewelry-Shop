const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, },
    image: { type: String },
    createAt: { type: Date, default: Date.now }
})


// Model
const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;