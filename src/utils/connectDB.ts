import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectDB = async () => {
	try {
		await mongoose.connect(config.get('bdURI'));
		log.info('MongoDB Connected');
	} catch (error) {
		log.error('Could not connect to MongoDB');
		process.exit(1);
	}
};

export default connectDB;
