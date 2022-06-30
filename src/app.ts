import express from 'express';
import log from './utils/logger';
const app = express();

app.listen(3000, () => {
	log.info('Server is running on port 3000');
});
