import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Database, databaseTag } from '../db/db.module';
import { events, Event } from '../db/schema';
import { TenantService } from '../tenant/tenant.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class EventsService {
  constructor(
    @Inject(databaseTag) private db: Database,
    private tenantService: TenantService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const partnerId = this.tenantService.getTenant().id;

    const [newEvent] = await this.db
      .insert(events)
      .values({
        ...createEventDto,
        startDate: new Date(createEventDto.startDate),
        partnerId,
      })
      .returning();

    return newEvent;
  }

  async findAll(): Promise<Event[]> {
    const partnerId = this.tenantService.getTenant().id;

    return this.db.query.events.findMany({
      where: eq(events.partnerId, partnerId),
    });
  }
}
