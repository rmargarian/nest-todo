import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto{
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}