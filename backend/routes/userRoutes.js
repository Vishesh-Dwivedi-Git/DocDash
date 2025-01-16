const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {jwtSecret} =require('../config/index');

const router = express.Router();
// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log("In the userRoutes");
    const { email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user and save it (assuming password hashing is done in the model)
    const user = new User({ email, password });
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
// Login Route
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
    
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    
      // Check if the password matches the stored hashed password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    
      // Create JWT token
      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
    
      // Send the token back to the client
      res.status(200).json({ token ,message: 'User logged in successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

