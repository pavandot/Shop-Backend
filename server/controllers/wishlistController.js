const asyncHandler = require('express-async-handler');

const Wishlist = require('../models/wishlistModel.js');
const Cart = require('../models/cartModel.js');

const getWishlist = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const wishlistItems = await Wishlist.find({ user: req.user.id }).populate('product');
	res.status(200).json({
		statusCode: 200,
		wishlistItems,
	});
});

const addToWishlist = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Please login to add to wishlist',
		});
	}

	if (!req.body.product) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}

	const wishlistItem = await Wishlist.findOne({
		user: req.user.id,
		product: req.body.product,
	});

	if (wishlistItem) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Product already in wishlist',
		});
	}

	const wishlistBody = {
		user: req.user.id,
		product: req.body.product,
	};
	console.log(wishlistBody);
	const wishlist = await Wishlist.create(wishlistBody);
	res.status(201).json({
		statusCode: 201,
		wishlist,
	});
});

const deleteWishlistItem = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const wishlistItem = await Wishlist.findById(req.params.wishlistId);
	if (!wishlistItem) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Wishlist item not found',
		});
	}

	if (wishlistItem.user.toString() !== req.user.id) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	await wishlistItem.remove();
	res.status(200).json({
		statusCode: 200,
		message: 'Wishlist item deleted',
	});
});

const moveToCart = asyncHandler(async (req, res) => {
	if (!req.user) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const wishlistItem = await Wishlist.findById(req.params.wishlistId);
	if (!wishlistItem) {
		return res.status(404).json({
			statusCode: 404,
			message: 'Wishlist item not found',
		});
	}

	if (wishlistItem.user.toString() !== req.user.id) {
		return res.status(401).json({
			statusCode: 401,
			message: 'Not authorized',
		});
	}

	const cartBody = {
		user: req.user.id,
		product: req.body.product,
		size: req.body.size,
		quantity: req.body.quantity,
	};
	const cart = await Cart.create(cartBody);
	await wishlistItem.remove();
	res.status(200).json({
		statusCode: 200,
		cart,
	});
});
module.exports = {
	getWishlist,
	addToWishlist,
	deleteWishlistItem,
	moveToCart,
};
