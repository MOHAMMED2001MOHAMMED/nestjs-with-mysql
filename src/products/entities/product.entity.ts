import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @IsNotEmpty()
  name: string;

  @Column()
  //@IsNumber()
  quantity: number;

  @Column()
  //@IsNotEmpty()
  description: string;
}
