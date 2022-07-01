import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel, { UserDocument } from '../models/user.model';
import config from 'config';

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, config.get<string>('jwtSecret'));
			if (typeof decoded !== 'string') {
				const user = await UserModel.findById(decoded._id);
				if (!user) {
					return res.status(401).send('Unauthorized');
				}
				req.user = user;
				next();
			}
		} catch (err) {
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
};

export default requireUser;
