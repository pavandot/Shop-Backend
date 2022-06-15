const { Router } = require('express');
const { addBrand, getBrands } = require('../controllers/brandController');
const { validateAddBrand } = require('../middleware/validators/brandValidator');
const router = Router();
router.post('/', validateAddBrand, addBrand);
router.get('/', getBrands);

module.exports = router;
