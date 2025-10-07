import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RandomnessService } from '../randomness/randomness.service';

@Injectable()
export class ExplorationService {
  constructor(private readonly prisma: PrismaService, private readonly randomness: RandomnessService) {}

  async startExploration(userId: string, mapId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const map = await this.prisma.map.findUnique({ where: { id: mapId } });
    if (!map) throw new NotFoundException('Mapa no encontrado');

    if (user.turns <= 0) {
      throw new Error('Sin turnos disponibles');
    }

    const base = 40 + map.rewardMultiplier * 10 - map.difficulty * 5;
    const bonus = user.level * 2;
    const roll = await this.randomness.getRandomInt(1, 100);
    const success = roll <= base + bonus;
    const rewardGas = success ? await this.randomness.getRandomInt(20, 80) : 0;

    const exploration = await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          gas: { increment: rewardGas },
          turns: { decrement: 1 },
          energy: { decrement: 5 }
        }
      });

      return tx.exploration.create({
        data: {
          userId,
          mapId,
          success,
          rewardGas,
          narrative: success
            ? 'Tu flota descubre restos energéticos que brillan como auroras en la neblina.'
            : 'Una tormenta de datos desestabiliza el motor cuántico y debes retirarte.'
        }
      });
    });

    return exploration;
  }
}
