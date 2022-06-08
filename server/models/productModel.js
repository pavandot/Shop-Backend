const { Schema, model } = require('mongoose');
const { brandCustomEnumFunction, categoryCustomEnumFunction } = require('../utils/utils.js');

const productSchema = new Schema({
	imageURL: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
		validate: (v) => brandCustomEnumFunction(v),
	},
	category: {
		type: String,
		required: true,
		validate: (v) => categoryCustomEnumFunction(v),
	},
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
});

const Product = model('Product', productSchema);

module.exports = Product;
