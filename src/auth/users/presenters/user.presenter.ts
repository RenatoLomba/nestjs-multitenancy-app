import { User } from '../../../db/schema';

export class UserPresenter {
  constructor(readonly user: User) {}

  toJSON() {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      roles: this.user.roles,
    };
  }
}
