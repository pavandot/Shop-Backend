import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
	imageURL: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
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
