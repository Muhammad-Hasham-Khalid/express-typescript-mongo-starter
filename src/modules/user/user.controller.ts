import { AuthGuard } from '~/lib/auth-guard';
import type { Request, Response } from 'express';

export class UserController {
  @AuthGuard
  me(req: Request, res: Response) {
    return res.status(200).send(req.user);
  }
}
