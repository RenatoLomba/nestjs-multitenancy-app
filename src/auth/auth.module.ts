import { Module } from '@nestjs/common';

import { UsersService } from './users/users.service';
import { PartnerUsersController } from './partner-users/partner-users.controller';
import { RegularUsersController } from './regular-users/regular-users.controller';
import { RegularUsersService } from './regular-users/regular-users.service';
import { PartnerUsersService } from './partner-users/partner-users.service';

@Module({
  controllers: [PartnerUsersController, RegularUsersController],
  providers: [UsersService, RegularUsersService, PartnerUsersService],
})
export class AuthModule {}
