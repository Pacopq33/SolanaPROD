import { Body, Controller, Headers, Post } from '@nestjs/common';
import { GasService } from './gas.service';
import { JwtService } from '@nestjs/jwt';
import { IsNotEmpty, IsNumber } from 'class-validator';

class PurchaseDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;
}

@Controller('gas')
export class GasController {
  constructor(private readonly gas: GasService, private readonly jwt: JwtService) {}

  @Post('purchase')
  async purchase(@Body() dto: PurchaseDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({ token, secret: process.env.JWT_SECRET });
    return this.gas.purchase(decoded.sub, dto.amount);
  }
}
