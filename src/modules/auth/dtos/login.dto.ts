import { z } from 'zod';

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginDto = z.infer<typeof LoginDto>;
export interface LoginResponse {
  token: string;
}
