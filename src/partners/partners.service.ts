import { Inject, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Database, databaseTag } from '../db/db.module';
import { Partner, partners, partnersUsers } from '../db/schema';

@Injectable()
export class PartnersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  async create(
    createPartnerDto: CreatePartnerDto,
    userId: number,
  ): Promise<Partner> {
    let partner: Partner;

    await this.db.transaction(async (tx) => {
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

      partner = newPartner;
    });

    return partner;
  }
}
