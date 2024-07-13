import { Router } from 'express';
import * as AuthController from './auth.controller';

export const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/register', AuthController.register);
