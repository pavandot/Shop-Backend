import BrandModel from '../models/brand.model';
import CategoryModel from '../models/category.model';
import log from './logger';
export const brandCustomEnumFunction = async (v: any) => {
	const brand = await BrandModel.findOne({ name: v }).lean();
	return !!brand;
};

export const categoryCustomEnumFunction = async (v: any) => {
	const category = await CategoryModel.findOne({ name: v }).lean();
	return !!category;
};
