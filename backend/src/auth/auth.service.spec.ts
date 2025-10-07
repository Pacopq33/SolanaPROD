import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma.service';

describe('AuthService', () => {
  it('rechaza firmas inválidas', async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              upsert: jest.fn()
            }
          }
        }
      ]
    }).compile();

    const service = module.get(AuthService);
    await expect(() => service.verifyWallet({ wallet: '0x', signature: '', message: '' })).rejects.toThrow();
  });
});
