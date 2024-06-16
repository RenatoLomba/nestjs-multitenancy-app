import { Injectable } from '@nestjs/common';

import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { UsersService } from '../users/users.service';
import { UserRoles } from '../users/enums/user-roles';

@Injectable()
export class PartnerUsersService {
  constructor(private readonly usersService: UsersService) {}

  createPartnerUser(user: CreatePartnerUserDto) {
    return this.usersService.createUser({
      ...user,
      roles: [UserRoles.PARTNER],
    });
  }
}
