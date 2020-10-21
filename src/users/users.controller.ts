import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('User')
@Controller('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id : string): Promise<User> {
    return this.userService.findById(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() createUserDto: CreateUserDto, @Param('id') id: string): Promise<UpdateResult>{
    createUserDto.id = Number(id);
    return this.userService.update(createUserDto)
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult>{
    return this.userService.delete(id);
  }

}
