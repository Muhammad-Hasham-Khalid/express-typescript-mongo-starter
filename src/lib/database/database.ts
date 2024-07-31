import { connect } from 'mongoose';
import { Logger } from '~/lib/logger';
import { AppException } from '~/lib/exceptions';
import { StatusCodes } from 'http-status-codes';

export async function connectToDatabase(databaseURI: string) {
  try {
    await connect(databaseURI);
    Logger.info('Database Connected');
  } catch (_error) {
    const error =
      _error instanceof Error
        ? _error
        : new Error('Database connection failed');

    Logger.error(error.message);

    throw new AppException({
      name: error.name,
      description: error.message,
      isOperational: false,
      httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
