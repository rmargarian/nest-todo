import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      }
    });
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async create(item: CreateUserDto): Promise<User>{
    const newUser = await this.userRepository.create(item);
    return await this.userRepository.save(newUser);
  }

  async update(item: CreateUserDto): Promise<UpdateResult>{
    return await this.userRepository.update(item.id, item);
  }

  async delete(id:string): Promise<DeleteResult>{
    return await this.userRepository.delete(id);
  }

}
