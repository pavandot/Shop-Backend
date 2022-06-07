import mongoose from 'mongoose';
import { brandCustomEnumFunction } from '../utils/utils.js';
const { Schema, model } = mongoose;

const productSchema = new Schema({
	imageURL: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		validate: (v) => brandCustomEnumFunction(v),
	},
	category: {
		type: String,
		required: true,
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

export default Product;
