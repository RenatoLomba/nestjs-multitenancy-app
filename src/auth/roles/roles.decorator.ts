import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../users/enums/user-roles';

export const Roles = (...args: UserRoles[]) => SetMetadata('roles', args);
