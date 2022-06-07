const Brand = require('../models/brandModel.js');

const brandCustomEnumFunction = async (v) => {
	const brand = await Brand.findOne({ name: v });
	return !!brand;
};

module.exports = { brandCustomEnumFunction };
