import express from 'express';
import { addProduct, deleteProduct, getProduct, getProducts } from '../controller/product.controller';
import validate from '../middleware/validateResource';
import { createProductSchema } from '../schema/product.schema';
const router = express.Router();

router.get('/', getProducts);
router.post('/', validate(createProductSchema), addProduct);
router.delete('/delete', deleteProduct);
router.get('/:id', getProduct);

export default router;
