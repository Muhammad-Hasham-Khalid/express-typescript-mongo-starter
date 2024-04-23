import { type User, UserModel } from './user.entity';
import type { CreateUserDto } from './dtos/create-user.dto';
import type { FilterQuery } from 'mongoose';
import bcrypt from 'bcrypt';

export class UserService {
  async create(createUserDto: CreateUserDto) {
    // hash the password
    const password = await bcrypt.hash(createUserDto.password, 8);

    const user = await UserModel.create({ ...createUserDto, password });
    return user;
  }

  async findById(id: string) {
    const user = await UserModel.findById(id).exec();
    return user;
  }

  async findOne(query: FilterQuery<User>) {
    const user = await UserModel.findOne(query).exec();
    return user;
  }
}
