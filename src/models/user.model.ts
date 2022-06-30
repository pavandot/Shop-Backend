import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserInput {
	userName: string;
	email: string;
	password: string;
}

export interface UserDocument extends UserInput, Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
	{
		userName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	let user = this as UserDocument;
	if (!user.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	return next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	let user = this as UserDocument;
	return bcrypt.compare(password, user.password).catch(() => false);
};

const UserModel = model('User', userSchema);

export default UserModel;
