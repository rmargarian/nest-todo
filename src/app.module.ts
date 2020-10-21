import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Todo } from './todo/entity/todo.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Todo],
    }),
    TodoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, TodoController, UsersController],
  providers: [AppService, TodoService, UsersService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
