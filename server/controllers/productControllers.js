import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.status(200).json({
		statusCode: 200,
		products,
	});
});

export const addProduct = asyncHandler(async (req, res) => {
	const productBody = req.body;
	if (!productBody.imageURL || !productBody.brand || !productBody.category || !productBody.name || !productBody.amount) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}
	const product = await Product.create(productBody);
	res.status(201).json({
		statusCode: 201,
		data: product,
	});
});

export const deleteProduct = asyncHandler(async (req, res) => {
	const productId = req.params.id;
	if (!productId) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}
	const product = await Product.findByIdAndDelete(productId);
	if (!product) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Product not found',
		});
	}
	res.status(200).json({
		statusCode: 200,
		data: product,
	});
});
