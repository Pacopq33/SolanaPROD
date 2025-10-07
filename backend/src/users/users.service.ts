import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async summary(userId: string) {
    const [user, assets, fleets, maps, listings, events] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: userId } }),
      this.prisma.asset.findMany({ where: { ownerId: userId } }),
      this.prisma.fleet.findMany({ where: { userId } }),
      this.prisma.map.findMany({ where: { isActive: true } }),
      this.prisma.marketListing.findMany({ where: { status: 'active' }, include: { asset: true } }),
      this.prisma.economyEvent.findMany({ where: { expiresAt: { gt: new Date() } } })
    ]);

    return {
      gas: user.gas,
      energy: user.energy,
      turns: user.turns,
      faction: user.faction,
      level: user.level,
      assets,
      fleets,
      maps,
      listings,
      events
    };
  }
}
