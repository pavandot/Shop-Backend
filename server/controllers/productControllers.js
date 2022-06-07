const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel.js');

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.status(200).json({
		statusCode: 200,
		products,
	});
});

const addProduct = asyncHandler(async (req, res) => {
	const productBody = req.body;
	if (!productBody.imageURL || !productBody.brand || !productBody.category || !productBody.name || !productBody.amount) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}
	const productValidation = await Product.findOne({ name: productBody.name });
	if (productValidation) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Product already exists',
		});
	}
	const product = await Product.create(productBody);
	res.status(201).json({
		statusCode: 201,
		data: product,
	});
});

const getProduct = asyncHandler(async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide an id',
		});
	}
	const product = await Product.findById(req.params.id);
	if (!product) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Product not found',
		});
	}
	res.status(200).json({
		statusCode: 200,
		product,
	});
});

const deleteProduct = asyncHandler(async (req, res) => {
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

module.exports = {
	getProducts,
	addProduct,
	getProduct,
	deleteProduct,
};
