const { Router } = require('express');
const { addToWishlist, getWishlist, deleteWishlistItem } = require('../controllers/wishlistController.js');
const protect = require('../middleware/authMiddleware.js');
const router = Router();

router.get('/', protect, getWishlist);
router.post('/', protect, addToWishlist);
router.delete('/:wishlistId', protect, deleteWishlistItem);

module.exports = router;
