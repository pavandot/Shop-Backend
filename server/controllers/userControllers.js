import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const registerUser = asyncHandler(async (req, res) => {
	let { userName, email, password } = req.body;
	if (!userName || !email || !password) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}

	// Validate email
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide a valid email',
		});
	}

	// Check if user already exists
	const user = await User.findOne({ email });
	if (user) {
		return res.status(400).json({
			statusCode: 400,
			message: 'User already exists',
		});
	}

	// Password encryption
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = await User.create({
		userName,
		email,
		password: hashedPassword,
	});

	if (!newUser) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Error creating user',
		});
	}

	if (newUser) {
		res.status(201).json({
			statusCode: 201,
			userName: newUser.userName,
			email: newUser.email,
			token: generateAuthToken(newUser),
		});
	}
});

export const loginUser = asyncHandler(async (req, res) => {
	let { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}

	// Check if not user exists
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({
			statusCode: 400,
			message: 'User does not exist',
		});
	}

	// Password encryption
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Incorrect password',
		});
	}

	res.status(200).json({
		statusCode: 200,
		userName: user.userName,
		email: user.email,
		token: generateAuthToken(user),
	});
});

// Utility function to generate a token

const generateAuthToken = (user) => {
	if (process.env.JWT_SECRET) {
		return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
	} else {
		throw new Error('JWT_SECRET is not defined');
	}
};
