const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Signup Route
// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
  
    // Create and save the new user
    const user = new User({ email, password });
    await user.save();
  
    // Send a response without JWT, since the user is not logged in yet
    res.status(201).json({ message: 'User created successfully' });
  });
  

// Login Route
// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
  
    // Check if the password matches the stored hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
  
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Send the token back to the client
    res.status(200).json({ token });
  });
  
module.exports = router;
