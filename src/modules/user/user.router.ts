import { Router } from 'express';
import { UserController } from './user.controller';
import { JwtAuthentication, makeAuthenticate } from '~/lib/authentication';

const userController = new UserController();

export const UserRouter = Router();

const auth = new JwtAuthentication();
const authRequired = makeAuthenticate(auth);

UserRouter.get('/me', authRequired, userController.me);
