import { Router } from 'express';
import { addBrand, getBrands } from '../controllers/brandController.js';
const router = Router();
router.post('/', addBrand);
router.get('/', getBrands);
export default router;
