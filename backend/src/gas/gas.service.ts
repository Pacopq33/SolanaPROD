import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class GasService {
  constructor(private readonly prisma: PrismaService) {}

  purchase(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        gas: { increment: amount }
      }
    });
  }
}
