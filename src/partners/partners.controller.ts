import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser, AuthenticatedUser } from '../auth/auth.decorator';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @AuthenticatedUser() user: AuthUser,
  ) {
    console.log(user);
    return this.partnersService.create(createPartnerDto);
  }
}
