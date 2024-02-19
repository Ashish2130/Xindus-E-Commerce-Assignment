const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        await AuthService.registerUser({ username, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AuthService.loginUser({ username, password });
        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(401).json({ message: 'Authentication failed' });
    }
});

module.exports = router;
