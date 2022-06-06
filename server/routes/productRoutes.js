import { Router } from 'express';
import { addProduct, getProducts, deleteProduct } from '../controllers/productControllers.js';
const router = Router();
router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);
export default router;
