const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported as 'app'
const WishlistService = require('../services/WishlistService');

describe('WishlistController Tests', () => {
    let wishlistServiceMock;

    beforeEach(() => {
        wishlistServiceMock = jest.spyOn(WishlistService, 'wishlistService');
    });

    afterEach(() => {
        wishlistServiceMock.mockRestore();
    });

    test('GET /api/wishlists', async () => {
        const sampleWishlists = [{ id: 1, name: 'Sample Wishlist', description: 'This is a sample wishlist' }];
        wishlistServiceMock.getAllWishlists.mockResolvedValue(sampleWishlists);

        const response = await request(app).get('/api/wishlists');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(sampleWishlists);
    });

    test('POST /api/wishlists', async () => {
        const newWishlist = { name: 'New Wishlist', description: 'This is a new wishlist' };
        wishlistServiceMock.createWishlist.mockResolvedValue(newWishlist);

        const response = await request(app)
            .post('/api/wishlists')
            .send(newWishlist);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newWishlist);
    });

    test('DELETE /api/wishlists/:id', async () => {
        const wishlistId = 1;
        wishlistServiceMock.deleteWishlist.mockResolvedValue();

        const response = await request(app).delete(`/api/wishlists/${wishlistId}`);

        expect(response.status).toBe(200);
    });
});
