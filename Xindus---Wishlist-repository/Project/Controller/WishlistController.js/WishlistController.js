const express = require('express');
const router = express.Router();
const WishlistService = require('../services/WishlistService');

// Route to get all wishlists
router.get('/', (req, res) => {
    const wishlists = WishlistService.getAllWishlists();
    res.json(wishlists);
});

// Route to add a new wishlist
router.post('/', (req, res) => {
    const wishlist = req.body;
    WishlistService.addWishlist(wishlist);
    res.status(201).json({ message: 'Wishlist added successfully', wishlist });
});

// Route to delete a wishlist by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    WishlistService.deleteWishlist(id);
    res.json({ message: 'Wishlist deleted successfully' });
});

module.exports = router;