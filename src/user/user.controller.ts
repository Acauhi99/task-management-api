import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserResponse, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<CreateUserResponse> {
    return await this.userService.create(user);
  }
}
