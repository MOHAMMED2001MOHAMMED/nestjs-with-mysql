import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Payload } from './payload';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private authService:AuthService) {}
  @Post('/login')
  async login(@Body() userData: LoginDto) {
    const user =  await this.userService.FindByLogin(userData);
    const payload: Payload= {
      phoneNumber: user.phoneNumber,
      name: user.name,
      id: user.id
    }

  const token =  await this.authService.signPayload(payload);
  return {token, user}


  }

  @Post('/register')
 async register(@Body() userData:CreateUserDto){
    const user = await this.userService.create(userData);
    const payload: Payload= {
      phoneNumber: user.phoneNumber,
      name: user.name,
      id: user.id
    }
    const token =  await this.authService.signPayload(payload);
    return {token, user}
  }
}


