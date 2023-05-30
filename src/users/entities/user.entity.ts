import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 15, unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;
  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}
