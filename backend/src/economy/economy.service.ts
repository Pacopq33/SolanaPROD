import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class EconomyService {
  constructor(private readonly prisma: PrismaService) {}

  async rotateEvents() {
    await this.prisma.economyEvent.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    const event = await this.prisma.economyEvent.create({
      data: {
        name: 'Anomalía Prisma',
        description: 'Recompensas de exploración x2 durante 24h.',
        effect: 'double-reward',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });
    return event;
  }
}
