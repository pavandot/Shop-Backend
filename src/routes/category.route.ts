import express from 'express';
import {
	addCategoryHandler,
	deleteCategoriesHandler,
	deleteCategoryHandler,
	getCategoriesHandler,
	getCategoryByUserIdHandler,
} from '../controller/category.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createCategorySchema } from '../schema/category.schema';
const router = express.Router();

router.get('/', getCategoriesHandler);
router.get('/user', requireUser, getCategoryByUserIdHandler);
router.post('/add', requireUser, validate(createCategorySchema), addCategoryHandler);
router.delete('/', requireUser, deleteCategoriesHandler);
router.delete('/:categoryId', requireUser, deleteCategoryHandler);
export default router;
