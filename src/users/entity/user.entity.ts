import { Entity, Column, PrimaryGeneratedColumn, Unique, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import * as bcrypt from 'bcrypt';


@Entity()
export class User{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email:string;

  @Column()
  @Length(6, 20, { message: 'The password must be at least 6 but not longer than 30 characters' })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 20);
  }
}