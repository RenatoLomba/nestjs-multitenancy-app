import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Database, databaseTag } from '../../db/db.module';
import { NewUser, User, users } from '../../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  async createUser(user: NewUser): Promise<User> {
    return (
      await this.db
        .insert(users)
        .values({
          ...user,
          password: this.generateHash(user.password),
        })
        .returning()
    )[0];
  }

  private generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
