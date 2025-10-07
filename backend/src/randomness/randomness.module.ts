import { Module } from '@nestjs/common';
import { RandomnessService } from './randomness.service';

@Module({
  providers: [RandomnessService],
  exports: [RandomnessService]
})
export class RandomnessModule {}
