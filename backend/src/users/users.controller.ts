import { Controller, Get, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
  constructor(private readonly users: UsersService, private readonly jwt: JwtService) {}

  @Get('summary')
  async summary(@Headers('authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    const decoded = await this.jwt.verifyAsync<{ sub: string }>({
      token,
      secret: process.env.JWT_SECRET
    });
    return this.users.summary(decoded.sub);
  }
}
