import { UnauthorizedException } from '~/lib/exceptions';
import { AuthTokenPayload, type Authentication } from './types';
import { UserRepository } from '~/modules/user/user.repository';
import { UserService } from '~/modules/user/user.service';
import jwt from 'jsonwebtoken';

export class JwtAuthentication implements Authentication {
  private readonly _userRepository = new UserRepository();
  private readonly _userService = new UserService();

  async validate(token: string) {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string') {
      throw new UnauthorizedException('invalid token content');
    }

    const parsedPayload = await AuthTokenPayload.safeParseAsync(payload);
    if (!parsedPayload.success) {
      throw new UnauthorizedException('invalid token content');
    }

    const user = await this._userRepository.findById(parsedPayload.data.id);
    if (user === null) {
      throw new UnauthorizedException('token is invalid');
    }

    return this._userService.protect(user);
  }

  public createToken(payload: AuthTokenPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    return token;
  }
}
