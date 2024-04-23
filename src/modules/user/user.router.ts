import { Router } from 'express';
import { UserController } from './user.controller';

const userController = new UserController();

export const UserRouter = Router();

UserRouter.get('/me', userController.me.bind(userController));
