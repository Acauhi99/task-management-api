import { Injectable } from '@nestjs/common';
import { hashSync as bcryptHash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHash(newUser.password, 10);
    this.users.push(newUser);
  }

  findByEmail(email: string): UserDto | null {
    return this.users.find((user) => user.email === email);
  }
}
