import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RandomnessService } from '../randomness/randomness.service';

const bundleWeights: Record<string, Record<number, number>> = {
  basic: { 1: 60, 2: 40 },
  intermediate: { 2: 40, 3: 35, 4: 25 },
  premium: { 3: 30, 4: 40, 5: 30 }
};

@Injectable()
export class MintService {
  constructor(private readonly prisma: PrismaService, private readonly randomness: RandomnessService) {}

  async mintAsset(userId: string, bundleId: keyof typeof bundleWeights) {
    const tier = this.randomness.getWeightedTier(bundleWeights[bundleId]);
    return this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { gas: { decrement: this.getPrice(bundleId) } }
      });

      return tx.asset.create({
        data: {
          ownerId: userId,
          type: bundleId === 'basic' ? 'worker' : 'ship',
          tier,
          energy: 100,
          faction: 'Sable Syndicate',
          rarity: tier >= 4 ? 'epic' : tier === 3 ? 'rare' : 'common'
        }
      });
    });
  }

  getPrice(bundleId: keyof typeof bundleWeights) {
    switch (bundleId) {
      case 'basic':
        return 50;
      case 'intermediate':
        return 120;
      case 'premium':
        return 250;
      default:
        return 50;
    }
  }
}
