import 'reflect-metadata';

import app from '~/app';
import { loadEnv } from './lib/env';
import { connectToDatabase } from './lib/database';

async function main() {
  loadEnv();
  await connectToDatabase(process.env.MONGODB_URI);
  app.start();
}

main().catch(() => process.exit(1));
