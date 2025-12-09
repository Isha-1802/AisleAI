const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        style: { type: String, default: '' },
        favoriteColors: [String],
        sizes: {
            top: String,
            bottom: String,
            shoes: String,
        },
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
        addedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
