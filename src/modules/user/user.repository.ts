import bcrypt from 'bcrypt';
import { EntityRepository } from '~/lib/entity-repository';
import type { CreateUserDto } from './dtos/create-user.dto';
import { UserModel, type User } from './user.entity';

export class UserRepository extends EntityRepository<User> {
  constructor() {
    super(UserModel);
  }

  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 8);

    const user = await this._model.create({ ...createUserDto, password });
    return user;
  }
}
