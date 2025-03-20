const express = require('express');
const router = express.Router();
const {
    getUsers,
    saveUser,
    getUserById,
    updateUser,
    deleteUser,
  } = require('../controller/user_controller');

// Route to get all Users
router.get('/',getUsers);

// Route to get a User by its ID
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Route to create a new User
router.post('/save', saveUser);

module.exports = router;
