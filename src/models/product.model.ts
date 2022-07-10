import { Schema, model, Document } from 'mongoose';
import { brandCustomEnumFunction, categoryCustomEnumFunction } from '../utils/utils';

export interface ProductInput extends Document {
	imageURL: string;
	brand: string;
	category: string;
	name: string;
	amount: number;
}

const productSchema = new Schema({
	imageURL: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
		validate: (v: any) => brandCustomEnumFunction(v),
	},
	category: {
		type: String,
		required: true,
		validate: (v: any) => categoryCustomEnumFunction(v),
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

const ProductModel = model<ProductInput>('Product', productSchema);

export default ProductModel;
