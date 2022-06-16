const { Router } = require('express');
const { getCartItems, addToCart, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { validateAddToCart } = require('../middleware/validators/cartValidator');
const protect = require('../middleware/authMiddleware');
const router = Router();
router.get('/', protect, getCartItems);
router.post('/', protect, validateAddToCart, addToCart);
router.put('/:cartId', protect, updateCartItem);
router.delete('/:cartId', protect, deleteCartItem);

module.exports = router;
