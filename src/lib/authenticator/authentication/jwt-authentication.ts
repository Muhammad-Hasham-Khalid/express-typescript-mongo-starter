import type { Request } from 'express';
import { UnauthorizedException } from '~/lib/exceptions';
import { AuthService } from '~/modules/auth/auth.service';
import { UserService } from '~/modules/user/user.service';
import type { Authentication } from './types';

export class JwtAuthentication implements Authentication {
  private readonly _authService = new AuthService();
  private readonly _userService = new UserService();

  async validate(req: Request) {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'undefined') {
      throw new UnauthorizedException('authorization header not found');
    }

    const authToken = authHeader.split(' ').at(1);
    if (typeof authToken === 'undefined') {
      throw new UnauthorizedException('authorization token not found');
    }

    const decodedToken = this._authService.decodeToken(authToken);
    const user = await this._userService.findById(decodedToken.id);

    if (user === null) throw new UnauthorizedException('token is invalid');

    req.user = user.toJSON();

    return true;
  }
}
