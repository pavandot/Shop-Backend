import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user.model';
export interface BrandInput {
	brand: string;
}

export interface BrandDocument extends BrandInput, Document {
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

const BrandModel = model<BrandDocument>('Brand', brandSchema);

export default BrandModel;
