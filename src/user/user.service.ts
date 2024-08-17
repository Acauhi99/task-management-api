import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { CreateUserResponse, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto): Promise<CreateUserResponse> {
    const userAlreadyRegistered = await this.findByUserEmail(newUser.email);

    if (userAlreadyRegistered) {
      throw new ConflictException(`User '${newUser.email}' already registered`);
    }

    const dbUser = new UserEntity();
    dbUser.email = newUser.email;
    dbUser.password = bcryptHashSync(newUser.password, 10);

    const { id, email } = await this.usersRepository.save(dbUser);
    return { id, email };
  }

  async findByUserEmail(email: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { email },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      email: userFound.email,
      password: userFound.password,
    };
  }
}
