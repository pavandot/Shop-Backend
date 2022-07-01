import express from 'express';
import validate from '../middleware/validateResource';
import { createUserSchema, LoginUserSchema } from '../schema/user.schema';
import { createUserHandler, loginUserHandler } from '../controller/user.controller';
const router = express.Router();

router.post('/register', validate(createUserSchema), createUserHandler);
router.post('/login', validate(LoginUserSchema), loginUserHandler);

export default router;
