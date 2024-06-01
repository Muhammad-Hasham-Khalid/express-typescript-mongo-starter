import { z } from 'zod';

export const RegisterDto = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type RegisterDto = z.infer<typeof RegisterDto>;
export interface RegisterResponse {
  token: string;
}
