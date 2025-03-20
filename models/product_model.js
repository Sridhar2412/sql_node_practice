const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize('mysql://root:root@localhost:3306/test'); // Replace with your DB credentials

// Define the Product model
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.STRING(255),
    allowNull: false, // This field cannot be null
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // This field cannot be null
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false, // This field cannot be null
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false, // This field cannot be null
  }
}, {
  tableName: 'products', // This is the name of your table
  timestamps: false // If you don't want the `createdAt` and `updatedAt` fields
});

// Synchronize the model with the database (creates table if it doesn't exist)
sequelize.sync()
  .then(() => console.log('Product table has been synced successfully.'))
  .catch(err => console.log('Error syncing Product table:', err));

module.exports = Product;
