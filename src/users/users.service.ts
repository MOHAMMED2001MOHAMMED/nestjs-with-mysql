import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { Payload } from 'src/auth/payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = hashed;
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return { name: user.name, phoneNumber: user.phoneNumber, id: user.id , role: user.role};
  }

  async FindByLogin(loginDto: LoginDto) {
    const { phoneNumber, password } = loginDto;
    const user = await this.userRepository.findOneBy({ phoneNumber });
    if (!user) {
      throw new HttpException('The user is not found', HttpStatus.UNAUTHORIZED);
    }
    if (!bcrypt.compare(password, user.password)) {
      throw new HttpException(
        'Wrong password or phone number',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { name: user.name, phoneNumber: user.phoneNumber, id: user.id ,role:user.role};
  }


  findByPayload(payload:Payload){
    const { phoneNumber } = payload;
    return this.userRepository.findOneBy({phoneNumber});
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }
}
