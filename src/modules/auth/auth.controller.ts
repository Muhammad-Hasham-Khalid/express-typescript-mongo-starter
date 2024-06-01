import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';
import type { LoginDto, LoginResponse } from './dtos/login.dto';
import type { RegisterDto, RegisterResponse } from './dtos/register.dto';

export class AuthController {
  private readonly _authService = new AuthService();

  login = async (
    req: Request<Record<string, string>, unknown, LoginDto>,
    res: Response<LoginResponse>,
  ) => {
    const result = await this._authService.login(req.body);
    return res.status(StatusCodes.OK).json(result);
  };

  register = async (
    req: Request<Record<string, string>, unknown, RegisterDto>,
    res: Response<RegisterResponse>,
  ) => {
    const result = await this._authService.register(req.body);
    return res.status(StatusCodes.OK).json(result);
  };
}
