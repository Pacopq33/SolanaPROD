import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { PrismaService } from '../common/prisma.service';
import { EconomyModule } from '../economy/economy.module';

@Module({
  imports: [EconomyModule],
  providers: [CronService, PrismaService]
})
export class CronModule {}
