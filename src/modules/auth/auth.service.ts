import { UserService } from '~/modules/user/user.service';
import type { LoginDto } from './dtos/login.dto';
import type { RegisterDto } from './dtos/register.dto';
import { AuthTokenPayload } from './dtos/auth-token-payload.dto';
import { BadRequestException } from '~/lib/exceptions';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {
  private readonly _userService = new UserService();

  public async login(loginDto: LoginDto) {
    const foundUser = await this._userService.findOne({ email: loginDto.email });
    if (foundUser === null) throw new BadRequestException('invalid credentials');

    const isPasswordCorrect = await bcrypt.compare(loginDto.password, foundUser.password);
    if (!isPasswordCorrect) throw new BadRequestException('invalid credentials');

    const { id, email } = foundUser;
    const token = this._generateAuthToken({ id, email });

    return { token };
  }

  public async register(registerDto: RegisterDto) {
    const newUser = await this._userService.create(registerDto);

    const payload = { id: newUser.id, email: newUser.email };
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
