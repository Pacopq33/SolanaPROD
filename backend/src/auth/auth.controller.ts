import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsString } from 'class-validator';

class VerifyWalletDto {
  @IsString()
  @IsNotEmpty()
  wallet!: string;

  @IsString()
  @IsNotEmpty()
  signature!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('wallet/verify')
  verifyWallet(@Body() dto: VerifyWalletDto) {
    return this.auth.verifyWallet(dto);
  }
}
