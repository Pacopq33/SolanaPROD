import { Body, Controller, Headers, Post } from '@nestjs/common';
import { MintService } from './mint.service';
import { JwtService } from '@nestjs/jwt';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

class MintDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['basic', 'intermediate', 'premium'])
  bundleId!: 'basic' | 'intermediate' | 'premium';
}

@Controller('mint')
export class MintController {
  constructor(private readonly mint: MintService, private readonly jwt: JwtService) {}

  @Post()
  async mintAsset(@Body() dto: MintDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({
      token,
      secret: process.env.JWT_SECRET
    });
    const asset = await this.mint.mintAsset(decoded.sub, dto.bundleId);
    return asset;
  }
}
