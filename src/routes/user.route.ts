import express from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { createUserHandler } from '../controller/user.controller';
const router = express.Router();

router.post('/', validate(createUserSchema), createUserHandler);

export default router;
