const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Passport Local Strategy for authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Find user by username
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        // Compare password using bcrypt
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        // If authentication successful, return the user object
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        // Deserialize user by ID
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Register endpoint
router.post('/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Create new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login endpoint
router.post('/auth/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
});

module.exports = router;