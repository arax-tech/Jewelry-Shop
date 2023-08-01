const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    onSale: { type: String, default: "No" },
    salePercentage: { type: Number, default: "0" },
    futureProduct: { type: String, default: "No" },
    colors: [{ type: String }],
    sizes: [{ type: String, }],
    images: [
        {
            image: { type: String },
        }
    ],
    description: { type: String },
    ratings: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    reviews: [
        {
            user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now }
})


// Model
const Product = new mongoose.model("Product", productSchema);
module.exports = Product;