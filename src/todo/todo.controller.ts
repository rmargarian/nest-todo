import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service'
import { Todo } from './entity/todo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import {  ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Todo[]>{
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id : string): Promise<Todo> {
    return this.todoService.findOne(id)
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo>{
    return this.todoService.create(createTodoDto)
  }

  @Put(':id')
  update(@Body() createTodoDto: CreateTodoDto, @Param('id') id: string): Promise<UpdateResult>{
    createTodoDto.id = Number(id);
    return this.todoService.update(createTodoDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult>{
    return this.todoService.delete(id);
  }

}
