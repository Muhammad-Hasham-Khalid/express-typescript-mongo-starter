import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { AppException } from './app-exception';

export class UnauthorizedException extends AppException {
  constructor(description?: string) {
    const httpCode = StatusCodes.UNAUTHORIZED;
    const reasonPhrase = getReasonPhrase(httpCode);

    super({ name: reasonPhrase, httpCode, description });
  }
}
