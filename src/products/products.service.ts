import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);
    return this.productModel.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  findOne(id: number) {
    return this.productModel.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productModel.delete(id);
  }
}
