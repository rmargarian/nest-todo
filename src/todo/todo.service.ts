import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoRepository.findOne(id)
  }

  async create(item: Todo): Promise<Todo>{
    const newTodo = await this.todoRepository.create(item);
    return  await this.todoRepository.save(newTodo);
  }

  async update(item: Todo): Promise<UpdateResult>{
    return await this.todoRepository.update(item.id, item);
  }

  async delete(id:string): Promise<DeleteResult>{
    return await this.todoRepository.delete(id);
  }
}
