import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user.model';
export interface CategoryInput {
	category: string;
}

export interface CategoryDocument extends CategoryInput, Document {
	user: UserDocument['_id'];
	createdAt: Date;
	updatedAt: Date;
}

const brandSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		category: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	}
);

const CategoryModel = model<CategoryDocument>('Category', brandSchema);

export default CategoryModel;
