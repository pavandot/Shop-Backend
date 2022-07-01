import BrandModel, { brandInput } from '../models/brand.model';

export const addBrand = async (userId: string, body: brandInput) => {
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
