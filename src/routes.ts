import { Express } from 'express';
import userRoutes from './routes/user.route';
import brandRoutes from './routes/brand.route';
const routes = (app: Express) => {
	app.use('/api/users', userRoutes);
	app.use('/api/brands', brandRoutes);
};

export default routes;
