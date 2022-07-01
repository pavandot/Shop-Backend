import express from 'express';
import {
	addBrandHandler,
	deleteBrandHandler,
	deleteBrandsHandler,
	getBrandByUserIdHandler,
	getBrandsHandler,
} from '../controller/brand.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createBrandSchema } from '../schema/brand.schema';

const router = express.Router();

router.get('/', getBrandsHandler);
router.get('/user', requireUser, getBrandByUserIdHandler);
router.post('/add', requireUser, validate(createBrandSchema), addBrandHandler);
router.delete('/', requireUser, deleteBrandsHandler);
router.delete('/:brandId', requireUser, deleteBrandHandler);
export default router;
