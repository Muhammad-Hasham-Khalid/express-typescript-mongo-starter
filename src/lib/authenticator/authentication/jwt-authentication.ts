import type { Request } from 'express';
import { UnauthorizedException } from '~/lib/exceptions';
import { AuthService } from '~/modules/auth/auth.service';
import type { Authentication } from './types';
import { UserRepository } from '~/modules/user/user.repository';
import { UserService } from '~/modules/user/user.service';

export class JwtAuthentication implements Authentication {
  private readonly _authService = new AuthService();
  private readonly _userRepository = new UserRepository();
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
    const user = await this._userRepository.findById(decodedToken.id);

    if (user === null) throw new UnauthorizedException('token is invalid');

    req.user = this._userService.protect(user);

    return true;
  }
}
