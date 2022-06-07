import { Router } from 'express';
import { addCategory, getCategories } from '../controllers/categoryController.js';
const router = Router();
router.post('/', addCategory);
router.get('/', getCategories);
export default router;
