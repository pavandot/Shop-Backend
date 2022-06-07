const { Router } = require('express');
const { addCategory, getCategories } = require('../controllers/categoryController.js');
const router = Router();
router.post('/', addCategory);
router.get('/', getCategories);

module.exports = router;
