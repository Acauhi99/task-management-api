import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  signIn(credentials: CredentialDto): AuthResponseDto {
    const foundUser = this.userService.findByEmail(credentials.email);

    if (
      !foundUser ||
      !bcryptCompare(credentials.password, foundUser.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, emai: foundUser.email };
    const token = this.jwtService.sign(payload);

    return {
      token: token,
      expiresIn: this.jwtExpirationTime,
    };
  }
}
