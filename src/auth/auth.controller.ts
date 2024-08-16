import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto, CredentialDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() credentials: CredentialDto): AuthResponseDto {
    return this.authService.signIn(credentials);
  }
}
