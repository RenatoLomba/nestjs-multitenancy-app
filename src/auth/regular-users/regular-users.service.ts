import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateRegularUserDto } from './dto/create-regular-user.dto';
import { UserRoles } from '../users/enums/user-roles';

@Injectable()
export class RegularUsersService {
  constructor(private readonly usersService: UsersService) {}

  createRegularUser(user: CreateRegularUserDto) {
    return this.usersService.createUser({ ...user, roles: [UserRoles.USER] });
  }
}
