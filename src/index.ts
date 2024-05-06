import app from '~/app';
import { connectToDatabase } from './lib/database';
import { loadEnv } from './lib/env';
import { ErrorHandler } from './lib/error-handler';
import { Logger } from './lib/logger';

async function main() {
  loadEnv();
  await connectToDatabase(process.env.MONGODB_URI);
  app.start(process.env.PORT);
}

process.on('uncaughtException', (error, origin) => {
  Logger.error(error.message, origin);
  ErrorHandler.handleError(error);
});

process.on('unhandledRejection', (reason, _promise) => {
  Logger.error(reason);
  ErrorHandler.handleError(new Error('UnhandledRejectionError'));
});

main().catch(() => process.exit(1));
