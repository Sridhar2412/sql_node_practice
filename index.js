const express = require('express');
const app = express();
const productRoutes = require('./routes/product_route');
const userRouter = require('./routes/user_route');

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Use the product routes for handling product-related API calls
app.use('/api/products', productRoutes);
app.use('/api/users', userRouter);

// Set the port for the server
const port = 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
