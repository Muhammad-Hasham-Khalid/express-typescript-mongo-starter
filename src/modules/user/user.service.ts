import type { SafeUser, User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
  private readonly _userRepository = new UserRepository();

  public protect(user: User): SafeUser {
    const { password, ...rest } = user;
    return { ...rest };
  }
}
