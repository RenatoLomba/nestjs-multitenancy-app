import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoles } from '../users/enums/user-roles';
import { Request } from 'express';
import { AuthUser } from '../auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user: AuthUser = request['user'];

    const isAllowed = requiredRoles.some((role) => user.roles.includes(role));

    if (!isAllowed) {
      throw new ForbiddenException(
        'You do not have permission to this resource',
      );
    }

    return true;
  }
}
