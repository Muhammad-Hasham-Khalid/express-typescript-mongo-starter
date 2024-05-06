import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type AnyZodObject } from 'zod';
import { AppException } from '~/lib/exceptions';

export function validateBody<T extends AnyZodObject>(schema: T) {
  return async function bodyValidator(req: Request, res: Response, next: NextFunction) {
    const parsedResult = await schema.safeParseAsync(req.body);

    if (!parsedResult.success) {
      throw new AppException({
        name: 'ValidationError',
        httpCode: StatusCodes.BAD_REQUEST,
        metadata: { issues: parsedResult.error.issues },
      });
    }

    req.body = parsedResult.data;
    next();
  };
}
