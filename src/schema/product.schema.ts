import { number, object, string, TypeOf } from 'zod';

export const createProductSchema = object({
	body: object({
		imageURL: string({
			required_error: 'Image URL is required',
		}),
		brand: string({
			required_error: 'Brand is required',
		}),
		category: string({
			required_error: 'Category is required',
		}),
		name: string({
			required_error: 'Product name is required',
		}),
		amount: number({
			required_error: 'Amount is required',
		}),
	}),
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
