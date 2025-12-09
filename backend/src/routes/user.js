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

module.exports = router;
