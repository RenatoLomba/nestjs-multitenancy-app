import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRoles } from './users/enums/user-roles';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  roles: UserRoles[];
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

export const AuthenticatedUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
