import { omit } from 'lodash';
import CategoryModel, { CategoryInput, CategoryDocument } from '../models/category.model';

export const addCategory = async (userId: string, body: CategoryInput) => {
	try {
		const isCategoryExist = await CategoryModel.findOne({ category: body.category });
		if (isCategoryExist) {
			return false;
		}
		const category = await CategoryModel.create({
			user: userId,
			category: body.category,
		});
		return category;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCategories = async () => {
	try {
		const category = await CategoryModel.find();
		// omit user field from brands array
		const categoryWithoutUser = category.map((category: CategoryDocument) => omit(category.toJSON(), 'user'));
		return categoryWithoutUser;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCategoryByUserId = async (userId: string) => {
	try {
		const categories = await CategoryModel.findOne({ user: userId });
		if (!categories) {
			return false;
		}
		return categories;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteCategories = async (userId: string) => {
	try {
		const category = await CategoryModel.findOneAndDelete({ user: userId });
		if (!category) {
			return false;
		}
		return category;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteCategory = async (userId: string, categoryId: string) => {
	try {
		const category = await CategoryModel.findOneAndDelete({ user: userId, _id: categoryId });
		if (!category) {
			return false;
		}
		return category;
	} catch (error: any) {
		throw new Error(error);
	}
};
