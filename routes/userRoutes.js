const express = require('express');

// User controller
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/users', createUser);

// Get all users
router.get('/users', getUsers);

// Get a user by ID
router.get('/users/:id', getUserById);

// Update a user
router.put('/users/:id', updateUser);

// Delete a user
router.delete('/users/:id', deleteUser);

// User login
router.post('/users/login', loginUser);

module.exports = router;
