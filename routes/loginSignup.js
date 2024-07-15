const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/signup', async (req, res) => {
    const { username,email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Email already registered!' });
        }

        let newUser = await User.create({username, email, password })
        

        res.json({ message: 'Registered successful', newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
