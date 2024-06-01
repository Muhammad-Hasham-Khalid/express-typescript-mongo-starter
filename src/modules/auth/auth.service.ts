import bcrypt from 'bcrypt';
import { BadRequestException } from '~/lib/exceptions';
import { UserRepository } from '~/modules/user/user.repository';
import type { LoginDto } from './dtos/login.dto';
import type { RegisterDto } from './dtos/register.dto';
import { JwtAuthentication } from '~/lib/authentication';

export class AuthService {
  private readonly _userRepository = new UserRepository();
  private readonly _jwtAuthentication = new JwtAuthentication();

  public async login(loginDto: LoginDto) {
    const foundUser = await this._userRepository.findOne({ email: loginDto.email });
    if (foundUser == null) throw new BadRequestException('invalid email');

    const isPasswordCorrect = await bcrypt.compare(loginDto.password, foundUser.password);
    if (!isPasswordCorrect) throw new BadRequestException('invalid password');

    const payload = {
      id: foundUser._id.toString(),
      email: foundUser.email,
    };
    const token = this._jwtAuthentication.createToken(payload);

    return { token };
  }

  public async register(registerDto: RegisterDto) {
    const alreadyExists = await this._userRepository.exists({
      $or: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (alreadyExists) {
      throw new BadRequestException('user with this email or username already exists');
    }

    const newUser = await this._userRepository.create(registerDto);

    const payload = {
      id: newUser._id.toString(),
      email: newUser.email,
    };
    const token = this._jwtAuthentication.createToken(payload);

    return { token };
  }

  public async comparePassword(password: string, hashedPassword: string) {
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
  }
}
