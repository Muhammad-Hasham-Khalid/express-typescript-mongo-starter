import { z } from 'zod';

export const AuthTokenPayload = z.object({
  id: z.string(),
  email: z.string().email(),
});

export type AuthTokenPayload = z.infer<typeof AuthTokenPayload>;
