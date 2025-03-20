const express = require('express');
const router = express.Router();
const {
    getProducts,
    saveProduct,
    getProductById
  } = require('../controller/product_controller');

// Route to get all products
router.get('/products',getProducts);

// Route to get a product by its ID
router.get('/products/:id', getProductById);

// Route to create a new product
router.post('/products/save', saveProduct);

module.exports = router;
