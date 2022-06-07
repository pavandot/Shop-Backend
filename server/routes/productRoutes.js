import { Router } from 'express';
import { addProduct, getProducts, deleteProduct, getProduct } from '../controllers/productControllers.js';
const router = Router();
router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);
export default router;
