import { Module } from '@nestjs/common';
import { GasService } from './gas.service';
import { GasController } from './gas.controller';
import { PrismaService } from '../common/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GasController],
  providers: [GasService, PrismaService]
})
export class GasModule {}
