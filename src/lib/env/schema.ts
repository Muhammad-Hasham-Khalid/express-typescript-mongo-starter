import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().or(z.number()),
  LOG_LEVEL: z.string().optional(),
  MONGODB_URI: z.string(),
  JWT_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
