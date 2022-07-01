import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user.model';
export interface brandInput {
	brand: string;
}

export interface brandDocument extends brandInput, Document {
	user: UserDocument['_id'];
	createdAt: Date;
	updatedAt: Date;
}

const brandSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		brand: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

const BrandModel = model<brandDocument>('Brand', brandSchema);

export default BrandModel;
