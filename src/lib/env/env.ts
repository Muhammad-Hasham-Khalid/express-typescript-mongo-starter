import dotenv, { type DotenvConfigOptions } from 'dotenv';
import { EnvSchema } from './schema';
import { Logger } from '~/lib/logger';
import { ZodError } from 'zod';

export function loadEnv(options?: DotenvConfigOptions): void {
  try {
    dotenv.config(options);
    EnvSchema.parse(process.env);
    Logger.info('✅ Loaded environment successfully');
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.flatten().fieldErrors;
      Logger.error('❌ Invalid environment variables', errors);
    }

    process.exit(1);
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}
