import { Response, Request } from 'express';
import { CreateCategoryInput } from '../schema/category.schema';
import { addCategory, deleteCategories, deleteCategory, getCategories, getCategoryByUserId } from '../services/category.service';

export const addCategoryHandler = async (req: Request<{}, {}, CreateCategoryInput['body']>, res: Response) => {
	try {
		const userId = req.user._id;
		const category = await addCategory(userId, req.body);

		if (!category) {
			return res.status(400).send('Category already exist');
		}

		res.status(200).json({
			message: 'Category created successfully',
			data: category,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const getCategoriesHandler = async (req: Request, res: Response) => {
	try {
		const categories = await getCategories();
		if (!categories) {
			return res.status(400).send('No categories found');
		}
		res.status(200).json({
			message: 'Categories found successfully',
			data: categories,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const getCategoryByUserIdHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const category = await getCategoryByUserId(userId);
		if (!category) {
			return res.status(400).json({
				message: 'No category found',
			});
		}
		res.status(200).json({
			message: 'Category found successfully',
			data: category,
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const deleteCategoriesHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const category = await deleteCategories(userId);
		if (!category) {
			return res.status(400).json({
				message: 'No category found',
			});
		}
		res.status(200).json({
			message: 'Category deleted successfully',
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.user._id;
		const categoryId = req.params.categoryId;
		const category = await deleteCategory(userId, categoryId);
		if (!category) {
			return res.status(400).json({
				message: 'No category found',
			});
		}
		res.status(200).json({
			message: 'Category deleted successfully',
		});
	} catch (error: any) {
		return res.status(400).send(error?.message || 'something went wrong');
	}
};
