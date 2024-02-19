const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported as 'app'
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('Authentication Endpoints', () => {
    // Define a test user
    const testUser = {
        username: 'testuser',
        password: 'testpassword'
    };

    // Create the test user before running tests
    beforeAll(async () => {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        testUser.password = hashedPassword;
        await User.create(testUser);
    });

    // Clean up after running tests
    afterAll(async () => {
        await User.deleteMany({}); // Delete all users
    });

    describe('POST /auth/register', () => {
        test('Register a new user', async () => {
            const newUser = {
                username: 'newuser',
                password: 'newpassword'
            };

            const response = await request(app)
                .post('/auth/register')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.user).toHaveProperty('_id');
            expect(response.body.user.username).toBe(newUser.username);
        });

        test('Attempt to register with an existing username', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send(testUser); // Use the existing test user

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Username already exists');
        });
    });

    describe('POST /auth/login', () => {
        test('Login with correct credentials', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send(testUser);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login successful');
            expect(response.body.user).toHaveProperty('_id');
            expect(response.body.user.username).toBe(testUser.username);
        });

        test('Attempt to login with incorrect password', async () => {
            const invalidCredentials = {
                username: testUser.username,
                password: 'wrongpassword'
            };

            const response = await request(app)
                .post('/auth/login')
                .send(invalidCredentials);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Incorrect password.');
        });

        test('Attempt to login with non-existent username', async () => {
            const nonExistentUser = {
                username: 'nonexistentuser',
                password: 'password'
            };

            const response = await request(app)
                .post('/auth/login')
                .send(nonExistentUser);

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Incorrect username.');
        });
    });
});
