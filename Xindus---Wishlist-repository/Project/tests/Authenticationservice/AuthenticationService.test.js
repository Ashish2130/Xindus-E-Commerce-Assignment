const bcrypt = require('bcrypt');
const AuthService = require('../services/authService');
const User = require('../models/User');

describe('Authentication Service Tests', () => {
    describe('registerUser', () => {
        test('Register a new user', async () => {
            // Arrange
            const userData = {
                username: 'testuser',
                password: 'testpassword'
            };

            // Act
            const newUser = await AuthService.registerUser(userData);

            // Assert
            expect(newUser).toHaveProperty('_id');
            expect(newUser.username).toBe(userData.username);

            // Clean up
            await User.deleteOne({ _id: newUser._id });
        });

        test('Attempt to register with an existing username', async () => {
            // Arrange
            const existingUser = await User.create({
                username: 'existinguser',
                password: await bcrypt.hash('existingpassword', 10)
            });

            // Act
            try {
                await AuthService.registerUser({ username: existingUser.username, password: 'password' });
            } catch (error) {
                // Assert
                expect(error.message).toBe('Username already exists');
            }

            // Clean up
            await User.deleteOne({ _id: existingUser._id });
        });
    });

    describe('loginUser', () => {
        test('Login with correct credentials', async () => {
            // Arrange
            const user = await User.create({
                username: 'testuser',
                password: await bcrypt.hash('testpassword', 10)
            });

            // Act
            const loggedInUser = await AuthService.loginUser({ username: user.username, password: 'testpassword' });

            // Assert
            expect(loggedInUser).toHaveProperty('_id');
            expect(loggedInUser.username).toBe(user.username);

            // Clean up
            await User.deleteOne({ _id: user._id });
        });

        test('Attempt to login with incorrect password', async () => {
            // Arrange
            const user = await User.create({
                username: 'testuser',
                password: await bcrypt.hash('testpassword', 10)
            });

            // Act
            try {
                await AuthService.loginUser({ username: user.username, password: 'wrongpassword' });
            } catch (error) {
                // Assert
                expect(error.message).toBe('Incorrect password.');
            }

            // Clean up
            await User.deleteOne({ _id: user._id });
        });

        test('Attempt to login with non-existent username', async () => {
            // Act
            try {
                await AuthService.loginUser({ username: 'nonexistentuser', password: 'password' });
            } catch (error) {
                // Assert
                expect(error.message).toBe('Incorrect username.');
            }
        });
    });
});
