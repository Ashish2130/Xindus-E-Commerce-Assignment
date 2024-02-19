const sql = require('mssql');
const config = require('../config');

// Create a new wishlist
async function createWishlist(wishlistData) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('name', sql.NVarChar, wishlistData.name)
            .input('description', sql.NVarChar, wishlistData.description)
            .input('userId', sql.Int, wishlistData.userId)
            .query('INSERT INTO Wishlists (name, description, userId) OUTPUT INSERTED.* VALUES (@name, @description, @userId)');
        
        return result.recordset[0];
    } catch (err) {
        console.error('Error creating wishlist:', err);
        throw err;
    }
}

// Find a wishlist by ID
async function findWishlistById(wishlistId) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('wishlistId', sql.Int, wishlistId)
            .query('SELECT * FROM Wishlists WHERE id = @wishlistId');
        
        return result.recordset[0];
    } catch (err) {
        console.error('Error finding wishlist by ID:', err);
        throw err;
    }
}

module.exports = {
    createWishlist,
    findWishlistById
};