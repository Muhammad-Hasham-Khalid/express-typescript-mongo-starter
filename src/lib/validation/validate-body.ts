import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type AnyZodObject } from 'zod';
import { AppException } from '~/lib/exceptions';

export function Body<T extends AnyZodObject>(schema: T) {
  function bodyValidator(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: RequestHandler = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const parsedResult = await schema.safeParseAsync(req.body);

      if (!parsedResult.success) {
        throw new AppException({
          name: 'ValidationError',
          httpCode: StatusCodes.BAD_REQUEST,
          metadata: { issues: parsedResult.error.issues },
        });
      }

      req.body = parsedResult.data;
      originalMethod.call(this, req, res, next);
    };

    return descriptor;
  }

  return bodyValidator;
}
