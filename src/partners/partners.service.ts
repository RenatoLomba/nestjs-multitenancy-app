import { Inject, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Database, databaseTag } from '../db/db.module';
import { Partner, partners, partnersUsers } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PartnersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  async create(
    createPartnerDto: CreatePartnerDto,
    userId: number,
  ): Promise<Partner> {
    const partner = await this.db.transaction(async (tx) => {
      const [newPartner] = await tx
        .insert(partners)
        .values(createPartnerDto)
        .returning();
      await tx
        .insert(partnersUsers)
        .values({
          partnerId: newPartner.id,
          userId,
        })
        .execute();

      return newPartner;
    });

    return partner;
  }

  async findManyByUserId(userId: number) {
    return this.db
      .select({
        partners,
      })
      .from(partners)
      .leftJoin(partnersUsers, eq(partners.id, partnersUsers.partnerId))
      .where(eq(partnersUsers.userId, userId))
      .execute();
  }
}
