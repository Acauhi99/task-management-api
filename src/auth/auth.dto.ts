import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CredentialDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class AuthResponseDto {
  @IsString()
  token: string;

  @IsNumber()
  expiresIn: number;
}
