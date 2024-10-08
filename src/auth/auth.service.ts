import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto, CredentialDto } from './auth.dto';

@Injectable()
export class AuthService {
  private jwtExpirationTime: number;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async signIn(credentials: CredentialDto): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserEmail(credentials.email);

    if (
      !foundUser ||
      !bcryptCompare(credentials.password, foundUser.password)
    ) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: foundUser.id, emai: foundUser.email };
    const token = this.jwtService.sign(payload);

    return {
      token: token,
      expiresIn: this.jwtExpirationTime,
    };
  }
}
