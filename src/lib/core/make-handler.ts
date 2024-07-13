import { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { type z } from 'zod';
import { AppException } from '~/lib/exceptions';

export function makeHandler<Body, Query, Params>(
  schema: {
    body?: z.Schema<Body>;
    query?: z.Schema<Query>;
    params?: z.Schema<Params>;
  },
  handler: (
    req: Request<Params, unknown, Body, Query>,
    res: Response,
    next: NextFunction,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any | Promise<any>,
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (typeof schema.body !== 'undefined') {
      const bodySchemaResult = await schema.body.safeParseAsync(req.body);

      if (!bodySchemaResult.success) {
        throw new AppException({
          name: 'ValidationError',
          httpCode: StatusCodes.BAD_REQUEST,
          metadata: { issues: bodySchemaResult.error.issues },
        });
      }
    }

    if (typeof schema.query !== 'undefined') {
      const querySchemaResult = await schema.query.safeParseAsync(req.query);

      if (!querySchemaResult.success) {
        throw new AppException({
          name: 'ValidationError',
          httpCode: StatusCodes.BAD_REQUEST,
          metadata: { issues: querySchemaResult.error.issues },
        });
      }
    }

    if (typeof schema.params !== 'undefined') {
      const paramsSchemaResult = await schema.params.safeParseAsync(req.params);

      if (!paramsSchemaResult.success) {
        throw new AppException({
          name: 'ValidationError',
          httpCode: StatusCodes.BAD_REQUEST,
          metadata: { issues: paramsSchemaResult.error.issues },
        });
      }
    }

    await handler(req as Request<Params, unknown, Body, Query>, res, next);
  };
}
