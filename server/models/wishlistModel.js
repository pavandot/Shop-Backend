const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
