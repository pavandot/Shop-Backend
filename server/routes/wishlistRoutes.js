import { Router } from 'express';
import { addToWishlist, getWishlist, deleteWishlistItem } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', protect, getWishlist);
router.post('/', protect, addToWishlist);
router.delete('/:wishlistId', protect, deleteWishlistItem);

export default router;
