import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import {  ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  
  @Get(':id')
  findOne(@Param('id') id : string): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.create(createUserDto)
  }

  @Put(':id')
  update(@Body() createUserDto: CreateUserDto, @Param('id') id: string): Promise<UpdateResult>{
    createUserDto.id = Number(id);
    return this.userService.update(createUserDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult>{
    return this.userService.delete(id);
  }

}
