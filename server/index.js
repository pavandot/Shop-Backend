// import path module
const path = require('path');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

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
