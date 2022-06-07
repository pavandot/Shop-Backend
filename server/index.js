// import path module
const path = require('path');
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/brand', brandRoutes);
app.use('/categories', categoryRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')));
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
