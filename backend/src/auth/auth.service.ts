import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma.service';

interface VerifyPayload {
  wallet: string;
  signature: string;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async verifyWallet(payload: VerifyPayload) {
    if (!payload.signature || payload.message !== 'NEON-DRIFTERS-AUTH') {
      throw new UnauthorizedException('Firma inválida');
    }

    const user = await this.prisma.user.upsert({
      where: { wallet: payload.wallet.toLowerCase() },
      update: { updatedAt: new Date() },
      create: { wallet: payload.wallet.toLowerCase(), faction: 'Sable Syndicate' }
    });

    const token = await this.jwt.signAsync({ sub: user.id, wallet: user.wallet });
    return { token, user };
  }
}
