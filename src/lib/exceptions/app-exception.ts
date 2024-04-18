import { StatusCodes, getReasonPhrase } from 'http-status-codes';

type AppExceptionParams = {
  name: string;
  httpCode: StatusCodes;
  description?: string;
  isOperational?: boolean;
  metadata?: Record<string, any>;
};

export class AppException extends Error {
  public readonly name: string;
  public readonly httpCode: StatusCodes;
  public readonly isOperational: boolean;
  public readonly metadata: Record<string, any>;

  constructor({
    name,
    httpCode,
    description = getReasonPhrase(httpCode),
    isOperational = true,
    metadata = {},
  }: AppExceptionParams) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.metadata = metadata;

    Error.captureStackTrace(this);
  }
}
