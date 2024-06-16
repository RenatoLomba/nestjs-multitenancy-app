import { Body, Controller, Post } from '@nestjs/common';

import { UserPresenter } from '../users/presenters/user.presenter';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { PartnerUsersService } from './partner-users.service';

@Controller('partner/users')
export class PartnerUsersController {
  constructor(private readonly partnerUsersService: PartnerUsersService) {}

  @Post()
  async create(@Body() user: CreatePartnerUserDto) {
    const newUser = await this.partnerUsersService.createPartnerUser(user);

    return new UserPresenter(newUser);
  }
}
