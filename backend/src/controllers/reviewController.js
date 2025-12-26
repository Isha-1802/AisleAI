const Review = require('../models/Review'); // This now imports the 'ProductReview' model
const Product = require('../models/Product');

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ product: productId })
            .populate('user', 'name') // Populate user name
            .sort({ createdAt: -1 });

        res.json({ reviews });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};

// Add a review
exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.userId;

        console.log('📝 Adding review:', { productId, userId, rating });

        // Check if user already reviewed
        // const existingReview = await Review.findOne({ user: userId, product: productId });
        // if (existingReview) {
        //     return res.status(400).json({ error: 'You have already reviewed this product' });
        // }

        const review = new Review({
            user: userId,
            product: productId,
            rating,
            comment
        });

        await review.save();

        // Optional: Update product average rating (Simplified)
        // In a real app, you'd calculate this more efficiently
        const reviews = await Review.find({ product: productId });
        const avgRating = reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(avgRating * 10) / 10,
            reviews: reviews.length
        });

        // Return review with populated user
        const populatedReview = await Review.findById(review._id).populate('user', 'name');

        res.status(201).json({ review: populatedReview });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.userId;

        const review = await Review.findOne({ _id: reviewId, user: userId });
        if (!review) {
            return res.status(404).json({ error: 'Review not found or unauthorized' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.json({ review });
    } catch (error) {
        console.error('Update review error:', error);
        res.status(500).json({ error: 'Failed to update review' });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.userId;

        const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });
        if (!review) {
            return res.status(404).json({ error: 'Review not found or unauthorized' });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Delete review error:', error);
        res.status(500).json({ error: 'Failed to delete review' });
    }
};
