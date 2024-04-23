import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { Body } from '~/lib/validation';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

export class AuthController {
  private readonly _authService = new AuthService();

  @Body(LoginDto)
  async login(req: Request<Record<string, string>, unknown, LoginDto>, res: Response) {
    const result = await this._authService.login(req.body);
    return res.status(StatusCodes.OK).json(result);
  }

  @Body(RegisterDto)
  async register(req: Request<Record<string, string>, unknown, RegisterDto>, res: Response) {
    const result = await this._authService.register(req.body);
    return res.status(StatusCodes.OK).json(result);
  }
}
