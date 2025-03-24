const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with MySQL connection
const sequelize = new Sequelize('mysql://root:root@localhost:3306/test'); // Replace with your DB credentials

// Define the User model
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mobile: {
    type: DataTypes.STRING(15),  // Use STRING for mobile numbers
    allowNull: false,  // Mobile should not be null
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false, // This field cannot be null
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false, // This field cannot be null
  }, 
  password: {
    type: DataTypes.STRING(100),
    allowNull: false, // This field cannot be null
  },
}, {
  tableName: 'users', // This is the name of your table
  timestamps: false, // If you don't want the `createdAt` and `updatedAt` fields
});

// Synchronize the model with the database (creates table if it doesn't exist)
sequelize.sync()
  .then(() => console.log('User table has been synced successfully.'))
  .catch(err => console.log('Error syncing User table:', err));

module.exports = User;
