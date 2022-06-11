// import path module
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Middleware
const errorHandler = require('./middleware/errorMiddleware');

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const brandRoutes = require('./routes/brandRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

// fix CORS error
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://shop-pavan.vercel.app');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);

app.use(errorHandler);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
