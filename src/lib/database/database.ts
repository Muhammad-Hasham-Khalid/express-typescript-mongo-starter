import { connect } from 'mongoose';
import { Logger } from '~/lib/logger';
import { AppException } from '~/lib/exceptions';
import { StatusCodes } from 'http-status-codes';

export async function connectToDatabase(databaseURI: string) {
  try {
    await connect(databaseURI);
    Logger.info('Database Connected');
  } catch (exception) {
    let error = new Error('Database connection failed');
    if (exception instanceof Error) {
      error = exception;
    }

    Logger.error(error.message);

    throw new AppException({
      name: error.name,
      description: error.message,
      isOperational: false,
      httpCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
