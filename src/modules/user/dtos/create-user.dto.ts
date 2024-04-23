import { z } from 'zod';

export const CreateUserDto = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export type CreateUserDto = z.infer<typeof CreateUserDto>;
