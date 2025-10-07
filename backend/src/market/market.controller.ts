import { Body, Controller, Headers, Post } from '@nestjs/common';
import { MarketService } from './market.service';
import { JwtService } from '@nestjs/jwt';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class ListDto {
  @IsString()
  @IsNotEmpty()
  assetId!: string;

  @IsNumber()
  priceGas!: number;
}

class BuyDto {
  @IsString()
  @IsNotEmpty()
  listingId!: string;
}

@Controller('market')
export class MarketController {
  constructor(private readonly market: MarketService, private readonly jwt: JwtService) {}

  @Post('list')
  async list(@Body() dto: ListDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({ token, secret: process.env.JWT_SECRET });
    return this.market.listAsset(decoded.sub, dto.assetId, dto.priceGas);
  }

  @Post('buy')
  async buy(@Body() dto: BuyDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({ token, secret: process.env.JWT_SECRET });
    return this.market.buyListing(decoded.sub, dto.listingId);
  }
}
