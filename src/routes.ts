import { Express } from 'express';
import userRoutes from './routes/user.route';
const routes = (app: Express) => {
	app.use('/api/users', userRoutes);
};

export default routes;
