const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');


router.get('/profile', auth, userController.getProfile);
router.delete('/profile', auth, userController.deleteUser);
router.put('/preferences', auth, userController.updatePreferences);
router.get('/favorites', auth, userController.getFavorites);
router.post('/favorites', auth, userController.addFavorite);
router.delete('/favorites/:productId', auth, userController.removeFavorite);

// Cart routes
router.get('/cart', auth, userController.getCart);
router.post('/cart', auth, userController.addToCart);
router.put('/cart/:productId', auth, userController.updateCartItem);
router.delete('/cart/:productId', auth, userController.removeFromCart);

module.exports = router;

