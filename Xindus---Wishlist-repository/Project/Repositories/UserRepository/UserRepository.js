// UserRepository equivalent
const sql = require('mssql');
const config = require('../config');

// Create a new user
async function createUser(userData) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.NVarChar, userData.username)
            .input('password', sql.NVarChar, userData.password)
            .query('INSERT INTO Users (username, password) OUTPUT INSERTED.* VALUES (@username, @password)');
        
        return result.recordset[0];
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

// Find a user by ID
async function findUserById(userId) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query('SELECT * FROM Users WHERE id = @userId');
        
        return result.recordset[0];
    } catch (err) {
        console.error('Error finding user by ID:', err);
        throw err;
    }
}

module.exports = {
    createUser,
    findUserById
};