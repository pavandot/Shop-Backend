import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import routes from './routes';
import log from './utils/logger';
// Middleware
const errorHandler = require('./middleware/errorMiddleware');
const port = config.get<number>('port');
const app = express();
app.use(express.json());
app.use(errorHandler);
app.listen(port, () => {
	log.info('Server is running on port ' + port);
	connectDB();
	routes(app);
});
