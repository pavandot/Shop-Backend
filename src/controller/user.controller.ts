import { Request, Response } from 'express';
import { createUser, generateToken, validatePassword } from '../services/user.service';
import log from '../utils/logger';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
	try {
		const user = await createUser(req.body);
		const token = generateToken(user._id.toString());
		res.status(201).json({
			message: 'User created successfully',
			data: { ...user, token },
		});
	} catch (error: any) {
		log.error(error);
		return res.status(409).send(error?.message || 'something went wrong');
	}
};

export const loginUserHandler = async (req: Request<{}, {}, LoginUserInput['body']>, res: Response) => {
	try {
		const user = await validatePassword(req.body.email, req.body.password);
		if (!user) {
			return res.status(401).json({
				statusCode: 401,
				message: 'Invalid email or password',
			});
		}
		const token = generateToken(user._id.toString());
		res.status(200).json({
			message: 'User logged in successfully',
			data: { ...user, token },
		});
	} catch (error: any) {
		log.error(error);
		return res.status(401).send(error?.message || 'something went wrong');
	}
};
