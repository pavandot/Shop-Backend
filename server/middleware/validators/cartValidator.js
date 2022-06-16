const { check, validationResult } = require('express-validator');
const Cart = require('../../models/cartModel');
const Product = require('../../models/productModel');
const asyncHandler = require('express-async-handler');

exports.validateAddToCart = [
	check('product').trim().not().isEmpty().withMessage('Product is required').isString().withMessage('Product must be a string'),
	check('size').trim().not().isEmpty().withMessage('Size is required').isString().withMessage('Size must be a string'),
	check('quantity').not().isEmpty().withMessage('Quantity is required').isNumeric().withMessage('Quantity must be a number'),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				statusCode: 400,
				message: 'Please provide all required fields',
			});
		}
		const isProductExist = await Product.isProductExist(req.body.product);
		if (!isProductExist) {
			return res.status(404).json({
				statusCode: 404,
				message: 'Product not found',
			});
		}
		next();
	}),
];
