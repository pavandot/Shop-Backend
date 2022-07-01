import { object, string, TypeOf } from 'zod';
import { OmitBy, Split } from '../utils/typescriptHelper';
export const createUserSchema = object({
	body: object({
		userName: string({
			required_error: 'Name is required',
		}),
		password: string({
			required_error: 'Password is required',
		}).min(6, 'Password must be at least 6 characters'),
		passwordConfirmation: string({
			required_error: 'Password confirmation is required',
		}),
		email: string({
			required_error: 'Email is required',
		}).email('Email is invalid'),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: 'Password and password confirmation must match',
		path: ['passwordConfirmation'],
	}),
});

export const LoginUserSchema = object({
	body: object({
		email: string({
			required_error: 'Email is required',
		}).email('Email is invalid'),
		password: string({
			required_error: 'Password is required',
		}).min(6, 'Password must be at least 6 characters'),
	}),
});

export type CreateUserInput = OmitBy<TypeOf<typeof createUserSchema>, Split<'body.passwordConfirmation'>>;
export type LoginUserInput = TypeOf<typeof LoginUserSchema>;
