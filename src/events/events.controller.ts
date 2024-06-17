import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TenantInterceptor } from '../tenant/tenant.interceptor';

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}
