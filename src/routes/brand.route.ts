import express, { Response, Request } from 'express';
import { addBrandHandler, getBrandsHandler } from '../controller/brand.controller';
import requireUser from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createBrandSchema } from '../schema/brand.schema';

const router = express.Router();

router.get('/', getBrandsHandler);
router.post('/add', [requireUser, validate(createBrandSchema)], addBrandHandler);

export default router;
