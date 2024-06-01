import { z } from 'zod';
import type { SafeUser } from '~/modules/user/user.entity';

export interface Authentication {
  validate: (token: string) => Promise<SafeUser>;
}

export const AuthTokenPayload = z.object({
  id: z.string(),
  email: z.string().email(),
});

export type AuthTokenPayload = z.infer<typeof AuthTokenPayload>;
