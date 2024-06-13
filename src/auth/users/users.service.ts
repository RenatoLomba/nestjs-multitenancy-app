import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import * as schema from '../../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}

  create(user: schema.NewUser): Promise<schema.User[]> {
    return this.db.insert(schema.users).values(user).returning();
  }
}
