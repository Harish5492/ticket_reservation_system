import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { TokensModule } from './helpers/tokens/token.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MovieMangementModule } from './modules/movie-management/movie-management.module';
import { HelpersModule } from './helpers/helper.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
    UsersModule,
    DatabaseModule,
    TokensModule,
    MovieMangementModule,
    HelpersModule,
  ],
})
export class AppModule {}
