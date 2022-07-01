import { object, string, TypeOf } from 'zod';

export const createBrandSchema = object({
	body: object({
		brand: string({
			required_error: 'Brand is required',
		}),
	}),
});

export type CreateBrandInput = TypeOf<typeof createBrandSchema>;
