import { omit } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import UserModel, { UserInput } from '../models/user.model';

export const createUser = async (input: UserInput) => {
	try {
		const user = await UserModel.create(input);
		return omit(user.toJSON(), 'password');
	} catch (error: any) {
		throw new Error(error);
	}
};

export const generateToken = (userId: string) => {
	try {
		const token = jwt.sign({ _id: userId }, config.get('jwtSecret'), { expiresIn: config.get('jwtExpiresIn') });
		return token;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const validatePassword = async (email: string, password: string) => {
	try {
		const user = await UserModel.findOne({ email });
		if (!user) {
			return false;
		}
		const isValid = await user.comparePassword(password);
		return isValid ? omit(user.toJSON(), 'password') : false;
	} catch (error: any) {
		throw new Error(error);
	}
};
