import { Router } from 'express';
import { addToCart, getCartItems, updateCartItem, deleteCartItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.put('/:cartId', protect, updateCartItem);
router.delete('/:cartId', protect, deleteCartItem);
export default router;
