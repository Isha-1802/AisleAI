const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeatured);
router.get('/trending', productController.getTrending);
router.get('/filters', productController.getFilters);
router.get('/compare', productController.compareBrands);
router.get('/:id', productController.getProduct);

module.exports = router;
