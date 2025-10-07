import { Injectable } from '@nestjs/common';
import crypto from 'node:crypto';

@Injectable()
export class RandomnessService {
  async getRandomInt(min: number, max: number) {
    const random = crypto.randomInt(min, max + 1);
    return random;
  }

  getWeightedTier(weights: Record<number, number>) {
    const total = Object.values(weights).reduce((acc, value) => acc + value, 0);
    const roll = Math.random() * total;
    let cumulative = 0;
    for (const [tier, weight] of Object.entries(weights)) {
      cumulative += weight;
      if (roll <= cumulative) {
        return Number(tier);
      }
    }
    return Number(Object.keys(weights)[0]);
  }
}
