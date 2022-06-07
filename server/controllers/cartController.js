import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const getCartItems = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const cartItems = await Cart.find({ user: req.user.id }).populate('product');
	res.status(200).json({
		statusCode: 200,
		cartItems,
	});
});

export const addToCart = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Please login to add to cart',
		});
	}

	if (!req.body.product || !req.body.size || !req.body.quantity) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}

	const productItem = await Product.findById(req.body.product);
	if (!productItem) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Product not found',
		});
	}

	const cartItem = await Cart.findOne({
		user: req.user._id,
		product: req.body.product,
	});

	if (cartItem) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Product already in cart',
		});
	}

	const cartBody = {
		user: req.user.id,
		product: req.body.product,
		size: req.body.size,
		quantity: req.body.quantity,
	};
	const cart = await Cart.create(cartBody);
	res.status(201).json({
		statusCode: 201,
		data: cart,
	});
});

export const updateCartItem = asyncHandler(async (req, res) => {
	const { cartId } = req.params;
	const cartItem = await Cart.findById(cartId);

	if (!cartItem) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Cart item not found',
		});
	}

	if (cartItem.user.toString() !== req.user.id) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const updatedCartItem = await Cart.findByIdAndUpdate(cartId, req.body, { new: true });
	res.status(200).json({
		statusCode: 200,
		data: updatedCartItem,
	});
});

export const deleteCartItem = asyncHandler(async (req, res) => {
	const { cartId } = req.params;
	const cartItem = await Cart.findById(cartId);

	if (!cartItem) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Cart item not found',
		});
	}

	if (cartItem.user.toString() !== req.user.id) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	await Cart.findByIdAndDelete(cartId);
	res.status(200).json({
		statusCode: 200,
		message: 'Cart item deleted',
	});
});
