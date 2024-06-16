import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Database, databaseTag } from '../../db/db.module';
import { NewUser, User, users } from '../../db/schema';
import { UserRoles } from './enums/user-roles';
import { CreatePartnerUserDto } from './dto/create-partner-user.dto';
import { CreateRegularUserDto } from './dto/create-regular-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(databaseTag) private db: Database) {}

  private generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  private async createUser(user: NewUser): Promise<User> {
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

  public createPartnerUser(user: CreatePartnerUserDto) {
    return this.createUser({ ...user, roles: [UserRoles.PARTNER] });
  }

  public createRegularUser(user: CreateRegularUserDto) {
    return this.createUser({ ...user, roles: [UserRoles.USER] });
  }

  public findByEmail(email: string) {
    return this.db.query.users.findFirst({ where: eq(users.email, email) });
  }

  public findById(id: number) {
    return this.db.query.users.findFirst({ where: eq(users.id, id) });
  }
}
