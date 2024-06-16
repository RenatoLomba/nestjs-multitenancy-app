import { Inject, Injectable } from '@nestjs/common';

import * as schema from '../../db/schema';
import { Database, databaseTag } from '../../db/db.module';

@Injectable()
export class UsersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  create(user: schema.NewUser): Promise<schema.User[]> {
    return this.db.insert(schema.users).values(user).returning();
  }
}
