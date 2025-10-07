import { Module } from '@nestjs/common';
import { MintService } from './mint.service';
import { MintController } from './mint.controller';
import { PrismaService } from '../common/prisma.service';
import { RandomnessModule } from '../randomness/randomness.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RandomnessModule, AuthModule],
  controllers: [MintController],
  providers: [MintService, PrismaService]
})
export class MintModule {}
