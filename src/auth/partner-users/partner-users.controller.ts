import { Body, Controller, Post } from '@nestjs/common';

import { UserPresenter } from '../users/presenters/user.presenter';
import { UsersService } from '../users/users.service';
import { CreatePartnerUserDto } from '../users/dto/create-partner-user.dto';

@Controller('partner/users')
export class PartnerUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreatePartnerUserDto) {
    const newUser = await this.usersService.createPartnerUser(user);

    return new UserPresenter(newUser);
  }
}
