class WishlistService {
    constructor() {
        // Initialize wishlist data
        this.wishlists = [];
    }

    // Method to retrieve all wishlists
    getAllWishlists() {
        return this.wishlists;
    }

    // Method to add a new wishlist
    addWishlist(wishlist) {
        this.wishlists.push(wishlist);
    }

    // Method to delete a wishlist by ID
    deleteWishlist(id) {
        this.wishlists = this.wishlists.filter(wishlist => wishlist.id !== id);
    }
}

// Initialize WishlistService instance
const wishlistService = new WishlistService();

// Route to get all wishlists
router.get('/', (req, res) => {
    const wishlists = wishlistService.getAllWishlists();
    res.json(wishlists);
});

// Route to add a new wishlist
router.post('/', (req, res) => {
    const wishlist = req.body;
    wishlistService.addWishlist(wishlist);
    res.status(201).json({ message: 'Wishlist added successfully', wishlist });
});

// Route to delete a wishlist by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    wishlistService.deleteWishlist(id);
    res.json({ message: 'Wishlist deleted successfully' });
});

module.exports = router;