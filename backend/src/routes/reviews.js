const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// Public: Get reviews for a product
router.get('/:productId', reviewController.getProductReviews);

// Protected: Add a review
router.post('/', auth, reviewController.addReview);

// Protected: Update review (owner only)
router.put('/:reviewId', auth, reviewController.updateReview);

// Protected: Delete review (owner only)
router.delete('/:reviewId', auth, reviewController.deleteReview);

module.exports = router;
