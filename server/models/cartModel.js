const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	size: { type: String, required: true },
	quantity: { type: Number, required: true },
});

cartSchema.statics.isCartItemExist = async (userId, productId) => {
	const cartItem = await Cart.findOne({
		user: userId,
		product: productId,
	});

	if (cartItem) {
		return cartItem;
	}

	return false;
};

cartSchema.methods.updatedQuantity = async function () {
	this.quantity = this.quantity + 1;
	await this.save();
};

const Cart = model('Cart', cartSchema);

module.exports = Cart;
