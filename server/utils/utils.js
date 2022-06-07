import Brand from '../models/brandModel.js';

export const brandCustomEnumFunction = async (v) => {
	const brand = await Brand.findOne({ name: v });
	console.log(brand);
	return !!brand;
};
