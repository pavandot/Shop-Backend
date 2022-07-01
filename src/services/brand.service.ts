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
