const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');
const brandCustomEnumFunction = async (v) => {
	const brand = await Brand.findOne({ name: v });
	return !!brand;
};

const categoryCustomEnumFunction = async (v) => {
	const category = await Category.findOne({ name: v });
	return !!category;
};

module.exports = { brandCustomEnumFunction, categoryCustomEnumFunction };
