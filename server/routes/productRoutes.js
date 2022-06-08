const { Router } = require('express');
const { addProduct, getProducts, deleteProduct, getProduct } = require('../controllers/productControllers');
const upload = require('../middleware/imageUploadMiddleware');
const router = Router();
router.get('/', getProducts);
router.post('/', upload.single('imageURL'), addProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProduct);

module.exports = router;
