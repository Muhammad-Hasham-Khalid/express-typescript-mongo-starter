import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.coerce.number().or(z.number()),
  LOG_LEVEL: z.string().optional(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;
