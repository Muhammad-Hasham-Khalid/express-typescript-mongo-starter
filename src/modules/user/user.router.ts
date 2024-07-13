import { Router } from 'express';
import * as UserController from './user.controller';
import { JwtAuthentication, makeAuthenticate } from '~/lib/authentication';

export const UserRouter = Router();

const auth = new JwtAuthentication();
const authRequired = makeAuthenticate(auth);

UserRouter.get('/me', authRequired, UserController.me);
