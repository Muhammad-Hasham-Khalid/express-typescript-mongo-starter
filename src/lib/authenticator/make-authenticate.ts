import type { NextFunction, Request, Response } from 'express';
import type { SafeUser } from '~/modules/user/user.entity';
import type { Authentication } from './authentication';

interface AuthenticatedRequest {
  user?: SafeUser;
}

export function makeAuthenticate(auth: Authentication) {
  return async function (req: Request, res: Response, next: NextFunction) {
    await auth.validate(req);
    next();
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends AuthenticatedRequest {}
  }
}
