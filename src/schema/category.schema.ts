import { object, string, TypeOf } from 'zod';

export const createCategorySchema = object({
	body: object({
		category: string({
			required_error: 'category is required',
		}),
	}),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
