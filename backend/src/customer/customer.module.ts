import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from 'src/logger/logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    WinstonModule.forRoot(winstonLoggerConfig),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
