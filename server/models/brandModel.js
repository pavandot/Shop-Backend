const { Schema, model } = require('mongoose');

const brandSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

brandSchema.statics.isBrandExist = async (name) => {
	const brand = await Brand.findOne({ name: name });
	if (brand) {
		return true;
	}
	return false;
};
brandSchema.statics.getBrands = async () => {
	const brands = await Brand.find().lean();
	return brands;
};
brandSchema.statics.addBrand = async (body) => {
	const brand = await Brand.create(body);
	return brand;
};
const Brand = model('Brand', brandSchema);

module.exports = Brand;
