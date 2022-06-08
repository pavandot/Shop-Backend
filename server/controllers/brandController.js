const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel.js');

const addBrand = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide a name',
		});
	}
	const validBrand = await Brand.findOne({ name: req.body.name });
	if (validBrand) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Brand already exists',
		});
	}
	const brand = await Brand.create(req.body);
	res.status(201).json({
		statusCode: 201,
		brand,
	});
});

const getBrands = asyncHandler(async (req, res) => {
	const brands = await Brand.find();
	res.status(200).json({
		statusCode: 200,
		brands,
	});
});

module.exports = {
	addBrand,
	getBrands,
};
