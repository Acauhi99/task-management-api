import { IsEmail, IsOptional, IsStrongPassword, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export class CreateUserResponse {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;
}
