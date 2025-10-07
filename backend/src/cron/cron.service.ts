import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../common/prisma.service';
import { EconomyService } from '../economy/economy.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly prisma: PrismaService, private readonly economy: EconomyService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async resetTurns() {
    await this.prisma.user.updateMany({ data: { turns: 5, energy: 100 } });
    this.logger.log('Turnos diarios reiniciados');
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async rotateMaps() {
    await this.prisma.map.updateMany({ data: { isActive: false } });
    await this.prisma.map.createMany({
      data: [
        {
          name: 'Ruinas Prismáticas',
          biome: 'Neon Desert',
          difficulty: 2,
          rewardMultiplier: 1.4,
          climate: 'Tormenta iónica'
        },
        {
          name: 'Distrito Aurora',
          biome: 'Mega City',
          difficulty: 3,
          rewardMultiplier: 1.8,
          climate: 'Lluvia de datos'
        }
      ]
    });
    await this.economy.rotateEvents();
    this.logger.log('Mapas y eventos rotados');
  }
}
