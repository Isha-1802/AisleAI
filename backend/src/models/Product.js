const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Dresses', 'Tops', 'Trousers', 'Footwear', 'Bags', 'Eyewear', 'Watches', 'Jewelry', 'Makeup', 'Skincare'],
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: Number,
    discount: Number,
    description: String,
    images: [String],
    colors: [String],
    sizes: [String],
    occasion: {
        type: String,
        enum: ['Casual', 'Formal', 'Party', 'Wedding', 'Festive', 'Sports', 'Work'],
    },
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: Number,
    stock: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    trending: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);
