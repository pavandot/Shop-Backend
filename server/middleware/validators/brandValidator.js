const { check, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

const Brand = require('../../models/brandModel');
exports.validateAddBrand = [
	check('name')
		.trim()
		.not()
		.isEmpty()
		.withMessage('Name is required')
		.isLength({ min: 3, max: 50 })
		.withMessage('Name must be between 3 and 50 characters'),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const message = errors.array().map((e) => e.msg);
			return res.status(400).json({
				statusCode: 400,
				message: message[0],
			});
		}

		const validateUser = await Brand.isBrandExist(req.body.name);
		if (validateUser) {
			return res.status(400).json({
				statusCode: 400,
				message: 'Brand already exists',
			});
		}
		next();
	}),
];
