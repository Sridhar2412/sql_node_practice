const Product = require('../models/product_model');

// Controller function to handle GET /products request
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Fetch all products
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Controller function to handle GET /products/:id request
const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId); // Fetch product by primary key (ID)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Controller function to handle POST /products request
const saveProduct = async (req, res) => {
  const { product_name, price, stock_quantity, category } = req.body;
  try {
    const product = await Product.create({
      product_name,
      price,
      stock_quantity,
      category
    });
    res.status(201).json(product); // Return the created product
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

module.exports = {
  getProducts,
  saveProduct,
  getProductById
};
