import { Inject, Injectable } from '@nestjs/common';

import { Database, databaseTag } from '../../db/db.module';
import { NewUser, User, users } from '../../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  async create(user: NewUser): Promise<User> {
    return (await this.db.insert(users).values(user).returning())[0];
  }
}
