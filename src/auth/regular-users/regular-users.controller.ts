import { Body, Controller, Post } from '@nestjs/common';

import { UserPresenter } from '../users/presenters/user.presenter';

import { UsersService } from '../users/users.service';
import { CreateRegularUserDto } from '../users/dto/create-regular-user.dto';

@Controller('users')
export class RegularUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateRegularUserDto) {
    const newUser = await this.usersService.createRegularUser(user);

    return new UserPresenter(newUser);
  }
}
