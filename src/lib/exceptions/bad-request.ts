import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { AppException } from './app-exception';

export class BadRequestException extends AppException {
  constructor(description?: string) {
    const httpCode = StatusCodes.BAD_REQUEST;
    const reasonPhrase = getReasonPhrase(httpCode);

    super({ name: reasonPhrase, httpCode, description });
  }
}
