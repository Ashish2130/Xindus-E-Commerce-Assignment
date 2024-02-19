const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthService {
    async registerUser(username, password) {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('Username already exists');
            }
            // Create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();
            return { message: 'User registered successfully' };
        } catch (error) {
            throw error;
        }
    }

    async loginUser(username, password) {
        try {
            // Find user by username
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('Incorrect username');
            }
            // Compare password using bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Incorrect password');
            }
            return { message: 'Login successful', user };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
