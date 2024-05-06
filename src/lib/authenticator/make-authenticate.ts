import type { NextFunction, Request, Response } from 'express';
import type { User } from '~/modules/user/user.entity';
import type { Authentication } from './authentication';

interface AuthenticatedRequest {
  user?: User;
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
