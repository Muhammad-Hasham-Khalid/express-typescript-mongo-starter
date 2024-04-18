import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { AppException } from './app-exception';

export class InternalServerErrorException extends AppException {
  constructor(description?: string) {
    const httpCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const reasonPhrase = getReasonPhrase(httpCode);

    super({ name: reasonPhrase, httpCode, description });
  }
}
