import { Request, Response } from 'express';
import { createUser } from '../services/user.service';
import log from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
	try {
		const user = await createUser(req.body);
		res.status(201).send(user);
	} catch (error: any) {
		log.error(error);
		return res.status(409).send(error?.message || 'something went wrong');
	}
};
