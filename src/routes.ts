import { Express } from 'express';
import userRoutes from './routes/user.route';
import brandRoutes from './routes/brand.route';
import categoryRoutes from './routes/category.route';
import productRoutes from './routes/product.route';
const routes = (app: Express) => {
	app.use('/api/users', userRoutes);
	app.use('/api/brands', brandRoutes);
	app.use('/api/category', categoryRoutes);
	app.use('/api/products', productRoutes);
};

export default routes;
