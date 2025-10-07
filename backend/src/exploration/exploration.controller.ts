import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ExplorationService } from './exploration.service';
import { JwtService } from '@nestjs/jwt';
import { IsNotEmpty, IsString } from 'class-validator';

class StartExplorationDto {
  @IsString()
  @IsNotEmpty()
  mapId!: string;
}

@Controller('exploration')
export class ExplorationController {
  constructor(private readonly exploration: ExplorationService, private readonly jwt: JwtService) {}

  @Post('start')
  async start(@Body() dto: StartExplorationDto, @Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({
      token,
      secret: process.env.JWT_SECRET
    });
    const exploration = await this.exploration.startExploration(decoded.sub, dto.mapId);
    return {
      success: exploration.success,
      rewardGas: exploration.rewardGas,
      narrative: exploration.narrative
    };
  }
}
