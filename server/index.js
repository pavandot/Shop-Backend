import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);

connectDB();
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
