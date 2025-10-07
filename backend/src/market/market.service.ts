import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService) {}

  listAsset(userId: string, assetId: string, priceGas: number) {
    return this.prisma.marketListing.create({
      data: {
        assetId,
        sellerId: userId,
        priceGas
      }
    });
  }

  async buyListing(userId: string, listingId: string) {
    return this.prisma.$transaction(async (tx) => {
      const listing = await tx.marketListing.findUniqueOrThrow({ where: { id: listingId }, include: { asset: true } });
      await tx.user.update({
        where: { id: userId },
        data: {
          gas: { decrement: listing.priceGas }
        }
      });
      await tx.asset.update({
        where: { id: listing.assetId },
        data: { ownerId: userId }
      });
      await tx.marketListing.update({ where: { id: listingId }, data: { status: 'sold' } });
      return listing;
    });
  }
}
