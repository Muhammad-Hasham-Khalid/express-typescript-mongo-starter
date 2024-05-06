import type { Request } from 'express';

export interface Authentication {
  validate: (req: Request) => Promise<boolean>;
}
