const { Router } = require('express');
const { addProduct, getProducts, deleteProduct, getProduct } = require('../controllers/productControllers');
const router = Router();
router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);

module.exports = router;
