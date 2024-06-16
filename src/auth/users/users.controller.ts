import { Body, Controller, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './enums/user-roles';

import * as bcrypt from 'bcrypt';
import { UserPresenter } from './presenters/user.presenter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.usersService.create({
      ...user,
      password: this.generateHash(user.password),
      roles: [UserRoles.PARTNER],
    });

    return new UserPresenter(newUser);
  }

  private generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
