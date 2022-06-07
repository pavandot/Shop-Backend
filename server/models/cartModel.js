import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cartSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	size: { type: String, required: true },
	quantity: { type: Number, required: true },
});

const Cart = model('Cart', cartSchema);

export default Cart;
