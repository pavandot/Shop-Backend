import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
export const addCategory = asyncHandler(async (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide a name',
		});
	}
	const validCategory = await Category.findOne({ name: req.body.name });
	if (validCategory) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Category already exists',
		});
	}
	const category = await Category.create(req.body);
	res.status(201).json({
		statusCode: 201,
		category,
	});
});

export const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find();
	res.status(200).json({
		statusCode: 200,
		categories,
	});
});
