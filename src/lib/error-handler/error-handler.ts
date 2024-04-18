import { AppException } from '~/lib/exceptions';
import type { Response } from 'express';

export const ErrorHandler = new (class ErrorHandler {
  public async handleError(error: Error, response?: Response): Promise<void> {
    if (error instanceof AppException && error.isOperational && response) {
      return this._handleOperationalError(error, response);
    }

    return this._handleCriticalError(error, response);
  }

  private _handleOperationalError(error: AppException, response: Response) {
    response.status(error.httpCode).json({
      statusCode: error.httpCode,
      message: error.message,
      error: error.name,
      ...error.metadata,
    });
  }

  private _handleCriticalError(error: Error, response?: Response) {}
})();
