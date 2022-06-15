const asyncHandler = require('express-async-handler');
const Brand = require('../models/brandModel.js');

const addBrand = asyncHandler(async (req, res) => {
	const body = {
		name: req.body.name,
	};
	const brand = await Brand.addBrand(body);
	res.status(201).json({
		statusCode: 201,
		brand,
	});
});

const getBrands = asyncHandler(async (req, res) => {
	const brands = await Brand.getBrands();
	res.status(200).json({
		statusCode: 200,
		brands,
	});
});

module.exports = {
	addBrand,
	getBrands,
};
