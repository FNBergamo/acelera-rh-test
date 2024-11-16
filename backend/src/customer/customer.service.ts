import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Customer[]> {
    this.logger.debug('Fetching all customers');
    const customers = await this.customerRepository.find();
    this.logger.debug(`Found ${customers.length} customers`);
    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    this.logger.debug(`Fetching customer with ID: ${id}`);
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      this.logger.warn(`Customer with ID ${id} not found`);
      throw new NotFoundException('Customer not found');
    }
    this.logger.debug(`Found customer: ${JSON.stringify(customer)}`);
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    this.logger.debug('Creating a new customer');
    const newCustomer = this.customerRepository.create(createCustomerDto);
    const savedCustomer = await this.customerRepository.save(newCustomer);
    this.logger.debug(`Customer created: ${JSON.stringify(savedCustomer)}`);
    return savedCustomer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    this.logger.debug(`Updating customer with ID: ${id}`);
    const customer = await this.findOne(id);
    Object.assign(customer, updateCustomerDto);
    const updatedCustomer = await this.customerRepository.save(customer);
    this.logger.debug(`Customer updated: ${JSON.stringify(updatedCustomer)}`);
    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    this.logger.debug(`Removing customer with ID: ${id}`);
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
    this.logger.debug(`Customer with ID ${id} removed successfully`);
  }
}
