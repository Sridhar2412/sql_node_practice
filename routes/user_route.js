const express = require('express');
const router = express.Router();
const {
    getUsers,
    saveUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
    getUserByToken
  } = require('../controller/user_controller');

// Route to get all Users
router.get('/list',getUsers);
router.get('/',getUserByToken);

// Route to get a User by its ID
router.get('/:id', getUserById);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

// Route to create a new User
router.post('/save', saveUser);
router.post('/login', login);


module.exports = router;
