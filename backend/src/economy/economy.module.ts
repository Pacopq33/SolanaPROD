import { Module } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { PrismaService } from '../common/prisma.service';

@Module({
  providers: [EconomyService, PrismaService],
  exports: [EconomyService]
})
export class EconomyModule {}
