const { Router } = require('express');
const { addBrand, getBrands } = require('../controllers/brandController');
const router = Router();
router.post('/', addBrand);
router.get('/', getBrands);

module.exports = router;
