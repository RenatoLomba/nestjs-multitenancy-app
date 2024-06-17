import { Inject, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { Database, databaseTag } from '../db/db.module';

@Injectable()
export class PartnersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  create(createPartnerDto: CreatePartnerDto) {
    return 'This action adds a new partner';
  }

  findAll() {
    return `This action returns all partners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
