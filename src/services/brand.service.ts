import { omit } from 'lodash';
import BrandModel, { BrandInput, BrandDocument } from '../models/brand.model';

export const addBrand = async (userId: string, body: BrandInput) => {
	try {
		const isBrandExist = await BrandModel.findOne({ brand: body.brand });
		if (isBrandExist) {
			return false;
		}
		const brand = await BrandModel.create({
			user: userId,
			brand: body.brand,
		});
		return brand;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getBrands = async () => {
	try {
		const brands = await BrandModel.find();
		// omit user field from brands array
		const brandsWithoutUser = brands.map((brand: BrandDocument) => omit(brand.toJSON(), 'user'));
		return brandsWithoutUser;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getBrandByUserId = async (userId: string) => {
	try {
		const brands = await BrandModel.findOne({ user: userId });
		if (!brands) {
			return false;
		}
		return brands;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteBrands = async (userId: string) => {
	try {
		const brand = await BrandModel.findOneAndDelete({ user: userId });
		if (!brand) {
			return false;
		}
		return brand;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteBrand = async (userId: string, brandId: string) => {
	try {
		const brand = await BrandModel.findOneAndDelete({ user: userId, _id: brandId });
		if (!brand) {
			return false;
		}
		return brand;
	} catch (error: any) {
		throw new Error(error);
	}
};
