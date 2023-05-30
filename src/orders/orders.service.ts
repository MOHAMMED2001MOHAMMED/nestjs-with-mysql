import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderModel: Repository<Order>) {}
  create(createOrderDto: CreateOrderDto) {
    const order = this.orderModel.create(createOrderDto);
    return this.orderModel.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderModel.createQueryBuilder('Orders')
    .select(['Orders.id', 'Orders.owner', 'Orders.product', 'Orders.total', 'Orders.createdAt', 'Orders.updatedAt', 'user.id', 'user.name', 'user.phoneNumber'])
    .leftJoin('Orders.owner', 'user')
    .getMany(); }

  findOne(id: number) {
    return this.orderModel.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderModel.delete(id);
  }
}
