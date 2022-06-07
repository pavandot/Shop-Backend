import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded._id);
			req.user = user;
			// console.log(user);
			// console.log(req.headers.authorization);
			// console.log(req.headers.authorization.split(' ')[1]);
			// console.log(decoded);
			next();
		} catch (err) {
			console.log(error);
			res.status(401);
			throw new Error('Not authorized');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});
