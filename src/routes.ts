import { Express } from 'express';
import userRoutes from './routes/user.route';
import brandRoutes from './routes/brand.route';
import categoryRoutes from './routes/category.route';
const routes = (app: Express) => {
	app.use('/api/users', userRoutes);
	app.use('/api/brands', brandRoutes);
	app.use('/api/category', categoryRoutes);
};

export default routes;
