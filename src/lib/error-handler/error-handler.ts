import { AppException } from '~/lib/exceptions';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ErrorHandler = new (class ErrorHandler {
  public handleError(error: Error, response?: Response): void {
    if (error instanceof AppException && error.isOperational && typeof response !== 'undefined') {
      this._handleOperationalError(error, response);
    } else {
      this._handleCriticalError(error, response);
    }
  }

  private _handleOperationalError(error: AppException, response: Response): void {
    response.status(error.httpCode).json({
      statusCode: error.httpCode,
      message: error.message,
      error: error.name,
      ...error.metadata,
    });
  }

  private _handleCriticalError(error: Error, response?: Response): void {
    if (typeof response !== 'undefined') {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
        error: error.name,
      });
    }

    process.exit(1);
  }
})();
