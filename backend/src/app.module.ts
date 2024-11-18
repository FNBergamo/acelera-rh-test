import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'xalala',
      database: 'acelerarh',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomerModule,
  ],
})
export class AppModule {}
