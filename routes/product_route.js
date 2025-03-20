const express = require('express');
const router = express.Router();
const {
    getProducts,
    saveProduct,
    getProductById
  } = require('../controller/product_controller');

// Route to get all products
router.get('/',getProducts);

// Route to get a product by its ID
router.get('/:id', getProductById);

// Route to create a new product
router.post('/save', saveProduct);

module.exports = router;
