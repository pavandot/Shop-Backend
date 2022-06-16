const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const getCartItems = asyncHandler(async (req, res) => {
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

const addToCart = asyncHandler(async (req, res) => {
	const cartBody = {
		user: req.user.id,
		product: req.body.product,
		size: req.body.size,
		quantity: req.body.quantity,
	};
	const cartItem = await Cart.isCartItemExist(cartBody.user, cartBody.product);
	if (!cartItem || cartBody.size !== cartItem.size) {
		const cart = await Cart.create(cartBody);
		res.status(201).json({
			statusCode: 201,
			data: cart,
		});
	}
	if (cartItem && cartBody.size === cartItem.size) {
		cartItem.updatedQuantity();
		res.status(200).json({
			statusCode: 200,
			data: cartItem,
		});
	}
});

const updateCartItem = asyncHandler(async (req, res) => {
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

const deleteCartItem = asyncHandler(async (req, res) => {
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

const getCartQuantity = asyncHandler(async (req, res) => {
	try {
		const cartItems = await Cart.find({ user: req.user.id }).select('quantity').lean();

		let totalQuantity = 0;
		cartItems.forEach((item) => {
			totalQuantity += item.quantity;
		});
		res.status(200).json({
			statusCode: 200,
			totalQuantity,
		});
	} catch (err) {
		res.status(500).json({
			statusCode: 500,
			message: 'Server error',
		});
	}
});

module.exports = {
	getCartItems,
	addToCart,
	updateCartItem,
	deleteCartItem,
	getCartQuantity,
};
