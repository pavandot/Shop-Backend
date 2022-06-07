import asyncHandler from 'express-async-handler';
import Brand from '../models/brandModel.js';
export const addBrand = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide a name',
		});
	}
	const brand = await Brand.create(req.body);
	res.status(201).json({
		statusCode: 201,
		brand,
	});
});

export const getBrands = asyncHandler(async (req, res) => {
	const brands = await Brand.find();
	res.status(200).json({
		statusCode: 200,
		brands,
	});
});
