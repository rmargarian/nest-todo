import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService,  } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async validate(userData: LoginUserDto): Promise<Pick<User, "id" | "first_name" | "last_name" | "email">> {
    const ema = userData.email;
    const getUser = await this.usersService.findByEmail( ema );
     
    const isPasswordMatching = await bcrypt.compare(
      userData.password,
      getUser.password
    );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }

      const { password, ...result } = getUser;
      return result; 
  }

  public async login(user: LoginUserDto): Promise<any>{
    return this.validate(user).then((userData)=>{
      if(!userData){
        return { status: 404 };
      }
      const payload = { id: userData.id };
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        access_token: accessToken,
        payload,
        status: 200
      };
    });
  }
}
