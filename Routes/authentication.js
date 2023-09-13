const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// Registration route (POST)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user object
    const newUser = new User({
      username,
      password, // Be sure to hash the password before saving (see Step 3)
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;