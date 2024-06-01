import type { Request, Response } from 'express';
import type { SafeUser } from './user.entity';

export class UserController {
  me = (req: Request, res: Response<SafeUser | undefined>) => {
    return res.status(200).send(req.user);
  };
}
