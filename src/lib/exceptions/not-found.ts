import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { AppException } from './app-exception';

export class NotFoundException extends AppException {
  constructor(description?: string) {
    const httpCode = StatusCodes.NOT_FOUND;
    const reasonPhrase = getReasonPhrase(httpCode);

    super({ name: reasonPhrase, httpCode, description });
  }
}
