import { Body, Controller, Post } from '@nestjs/common';

import { UserPresenter } from '../users/presenters/user.presenter';
import { RegularUsersService } from './regular-users.service';
import { CreateRegularUserDto } from './dto/create-regular-user.dto';

@Controller('users')
export class RegularUsersController {
  constructor(private readonly regularUsersService: RegularUsersService) {}

  @Post()
  async create(@Body() user: CreateRegularUserDto) {
    const newUser = await this.regularUsersService.createRegularUser(user);

    return new UserPresenter(newUser);
  }
}
