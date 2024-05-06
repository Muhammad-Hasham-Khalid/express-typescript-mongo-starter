import type { Request, Response } from 'express';

export class UserController {
  me = (req: Request, res: Response) => {
    return res.status(200).send(req.user);
  };
}
