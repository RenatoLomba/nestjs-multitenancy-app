import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
import { Database, databaseTag } from '../db/db.module';
import { AuthUser } from '../auth/auth.decorator';
import { partners, partnersUsers } from '../db/schema';
import { Request } from 'express';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private tenantService: TenantService,
    @Inject(databaseTag) private db: Database,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const user: AuthUser = request['user'];

    const xTenantIdHeaderParam = request.headers['x-tenant-id'];

    if (!xTenantIdHeaderParam) {
      throw new BadRequestException('x-tenant-id header is required');
    }

    const tenantId = parseInt(xTenantIdHeaderParam as string);

    const partnerResult = await this.db
      .select({
        partner: partners,
      })
      .from(partnersUsers)
      .leftJoin(partners, eq(partnersUsers.partnerId, partners.id))
      .where(
        and(
          eq(partnersUsers.userId, user.id),
          eq(partnersUsers.partnerId, tenantId),
        ),
      );

    if (partnerResult.length === 0) {
      throw new ForbiddenException('User does not have access to this tenant');
    }

    const tenant = partnerResult[0].partner;

    this.tenantService.setTenant(tenant);

    return next.handle();
  }
}
