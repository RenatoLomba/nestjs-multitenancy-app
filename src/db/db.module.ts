import { Module } from '@nestjs/common';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';

import * as schema from './schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
      tag: 'DB',
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
