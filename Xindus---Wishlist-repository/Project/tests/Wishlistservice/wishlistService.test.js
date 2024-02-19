describe('WishlistService Tests', () => {
    // Mock the WishlistRepository and perform tests similar to WishlistServiceTest
    let wishlistService;

    beforeEach(() => {
        wishlistService = new WishlistService();
    });

    test('getAllWishlists should return all wishlists', () => {
        // Mock some sample wishlists
        const sampleWishlists = [
            { id: 1, name: 'Wishlist 1', description: 'Description 1' },
            { id: 2, name: 'Wishlist 2', description: 'Description 2' }
        ];

        // Add wishlists to the service
        sampleWishlists.forEach(wishlist => {
            wishlistService.addWishlist(wishlist);
        });

        // Call getAllWishlists and compare with the sample wishlists
        const result = wishlistService.getAllWishlists();
        expect(result).toEqual(sampleWishlists);
    });

    test('addWishlist should add a new wishlist', () => {
        const newWishlist = { id: 3, name: 'New Wishlist', description: 'New Description' };
        wishlistService.addWishlist(newWishlist);
        const result = wishlistService.getAllWishlists();
        expect(result).toContainEqual(newWishlist);
    });

    test('deleteWishlist should delete a wishlist by ID', () => {
        // Add some sample wishlists
        const wishlists = [
            { id: 1, name: 'Wishlist 1', description: 'Description 1' },
            { id: 2, name: 'Wishlist 2', description: 'Description 2' },
            { id: 3, name: 'Wishlist 3', description: 'Description 3' }
        ];

        // Add wishlists to the service
        wishlists.forEach(wishlist => {
            wishlistService.addWishlist(wishlist);
        });

        // Delete a wishlist by ID
        const wishlistIdToDelete = 2;
        wishlistService.deleteWishlist(wishlistIdToDelete);

        // Ensure that the wishlist with ID 2 is deleted
        const result = wishlistService.getAllWishlists();
        expect(result).not.toContainEqual(expect.objectContaining({ id: 2 }));
    });
});