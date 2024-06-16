import { Global, Module } from '@nestjs/common';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import * as schema from './schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseTag = 'DB';
export type Database = LibSQLDatabase<typeof schema>;

@Global()
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const url = configService.get<string>('DB_URL');

        return {
          postgres: {
            url,
          },
          config: { schema: { ...schema } },
        };
      },
      tag: databaseTag,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
