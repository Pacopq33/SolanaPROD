import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ExplorationModule } from '../exploration/exploration.module';
import { MintModule } from '../mint/mint.module';
import { MarketModule } from '../market/market.module';
import { GasModule } from '../gas/gas.module';
import { EconomyModule } from '../economy/economy.module';
import { CronModule } from '../cron/cron.module';
import { RandomnessModule } from '../randomness/randomness.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({ pinoHttp: { level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' } }),
    AuthModule,
    UsersModule,
    ExplorationModule,
    MintModule,
    MarketModule,
    GasModule,
    EconomyModule,
    CronModule,
    RandomnessModule
  ]
})
export class AppModule {}
