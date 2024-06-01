import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestException } from '~/lib/exceptions';
import { UserRepository } from '~/modules/user/user.repository';
import { AuthTokenPayload } from './dtos/auth-token-payload.dto';
import type { LoginDto } from './dtos/login.dto';
import type { RegisterDto } from './dtos/register.dto';

export class AuthService {
  private readonly _userRepository = new UserRepository();

  public async login(loginDto: LoginDto) {
    const foundUser = await this._userRepository.findOne({ email: loginDto.email });
    if (foundUser == null) throw new BadRequestException('invalid email');

    const isPasswordCorrect = await bcrypt.compare(loginDto.password, foundUser.password);
    if (!isPasswordCorrect) throw new BadRequestException('invalid password');

    const payload = {
      id: foundUser._id.toString(),
      email: foundUser.email,
    };
    const token = this._generateAuthToken(payload);

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
    const token = this._generateAuthToken(payload);

    return { token };
  }

  private _generateAuthToken(payload: AuthTokenPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
  }

  public decodeToken(token: string) {
    const decodedToken = AuthTokenPayload.parse(jwt.decode(token));
    return decodedToken;
  }

  public async comparePassword(password: string, hashedPassword: string) {
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
  }
}
