import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { UnauthorizedException } from '../exceptions';
import { UserService } from '~/modules/user/user.service';
import { AuthService } from '~/modules/auth/auth.service';
import type { User } from '~/modules/user/user.entity';

interface AuthenticatedRequest {
  user?: User;
}

const authService = new AuthService();
const userService = new UserService();

export function AuthGuard(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod: RequestHandler = descriptor.value;

  descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'undefined') {
      throw new UnauthorizedException('Authorization header not found');
    }

    const authToken = authHeader.split(' ').at(1);
    if (typeof authToken === 'undefined') {
      throw new UnauthorizedException('Authorization token not found');
    }

    const decodedToken = authService.decodeToken(authToken);
    const user = await userService.findById(decodedToken.id);

    if (user === null) throw new UnauthorizedException('invalid token');

    req.user = user.toJSON();

    originalMethod.call(this, req, res, next);
  };

  return descriptor;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends AuthenticatedRequest {}
  }
}
