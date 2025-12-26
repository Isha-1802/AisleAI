const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // We store user name snapshot to avoid extra lookups, or just populate. Let's populate.
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can only review a product once
// reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// We rename the model to 'ProductReview' to force Mongoose to use a new collection 
// (productreviews) which won't have the old unique index that was causing errors.
module.exports = mongoose.model('ProductReview', reviewSchema);
