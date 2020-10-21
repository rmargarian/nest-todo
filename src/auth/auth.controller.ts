import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {  ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return this.authService.login(user);
  }
}