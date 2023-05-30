import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  product: string;

  @IsNumber()
  total: number;
}
