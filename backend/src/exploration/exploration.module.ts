import { Module } from '@nestjs/common';
import { ExplorationService } from './exploration.service';
import { ExplorationController } from './exploration.controller';
import { PrismaService } from '../common/prisma.service';
import { RandomnessModule } from '../randomness/randomness.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RandomnessModule, UsersModule, AuthModule],
  controllers: [ExplorationController],
  providers: [ExplorationService, PrismaService]
})
export class ExplorationModule {}
