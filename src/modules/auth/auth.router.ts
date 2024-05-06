import { Router } from 'express';
import { validateBody } from '~/lib/validation';
import { AuthController } from './auth.controller';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

const authController = new AuthController();

export const AuthRouter = Router();

AuthRouter.post('/login', validateBody(LoginDto), authController.login);
AuthRouter.post('/register', validateBody(RegisterDto), authController.register);
