import { Router } from 'express';
import { AuthController } from './auth.controller';

const authController = new AuthController();

export const AuthRouter = Router();

AuthRouter.post('/login', authController.login.bind(authController));
AuthRouter.post('/register', authController.register.bind(authController));
