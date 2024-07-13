import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { makeHandler } from '~/lib/core/make-handler';

const authService = new AuthService();

export const login = makeHandler({ body: LoginDto }, async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(StatusCodes.OK).json(result);
});

export const register = makeHandler({ body: RegisterDto }, async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(StatusCodes.OK).json(result);
});
