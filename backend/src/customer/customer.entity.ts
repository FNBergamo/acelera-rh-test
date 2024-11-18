import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  salary: number;

  @Column('decimal', { precision: 15, scale: 2 })
  companyValue: number;
}
