const express = require('express');
const router = express.Router();
const WishlistService = require('../services/WishlistService');

// Get all wishlists
router.get('/', async (req, res) => {
    try {
        const wishlists = await WishlistService.getAllWishlists();
        res.json(wishlists);
    } catch (error) {
        console.error('Error fetching wishlists:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a new wishlist
router.post('/', async (req, res) => {
    try {
        const wishlistData = req.body;
        const newWishlist = await WishlistService.addWishlist(wishlistData);
        res.status(201).json({ message: 'Wishlist added successfully', wishlist: newWishlist });
    } catch (error) {
        console.error('Error adding wishlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a wishlist by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await WishlistService.deleteWishlist(id);
        res.json({ message: 'Wishlist deleted successfully' });
    } catch (error) {
        console.error('Error deleting wishlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
