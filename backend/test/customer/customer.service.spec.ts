import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomerService } from 'src/customer/customer.service';
import { Customer } from 'src/customer/customer.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  const mockCreateCustomerDto: CreateCustomerDto = {
    name: 'Test Customer',
    salary: 5000,
    companyValue: 10000,
  };

  const mockCustomer: Customer = {
    id: 1,
    name: 'Test Customer',
    salary: 5000,
    companyValue: 10000,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            debug: jest.fn(),
            warn: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a paginated list of customers', async () => {
      const mockCustomers = [
        { id: 1, name: 'Test Customer', salary: 1000, companyValue: 5000 },
        { id: 2, name: 'Jane Doe', salary: 2000, companyValue: 8000 },
      ];
      const mockTotal = 2;

      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValueOnce([mockCustomers, mockTotal]);

      const result = await service.findAll(1, 16);

      expect(result).toEqual({
        customers: mockCustomers,
        total: mockTotal,
      });
      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 16,
        order: { id: 'ASC' },
      });
    });

    it('should enforce a maximum limit of 40', async () => {
      const mockCustomers = [];
      const mockTotal = 0;

      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValueOnce([mockCustomers, mockTotal]);

      const result = await service.findAll(1, 50);

      expect(result).toEqual({
        customers: mockCustomers,
        total: mockTotal,
      });
      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 40,
        order: { id: 'ASC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a customer when found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockCustomer);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if customer not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create a customer successfully', async () => {
      repository.create = jest.fn().mockReturnValue(mockCustomer);
      repository.save = jest.fn().mockResolvedValue(mockCustomer);

      const result = await service.create(mockCreateCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(repository.create).toHaveBeenCalledWith(mockCreateCustomerDto);
      expect(repository.save).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw an error if customer creation fails', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'Test Customer',
        salary: 5000,
        companyValue: -9999,
      };

      jest.spyOn(repository, 'create').mockReturnValue(new Customer());
      jest
        .spyOn(repository, 'save')
        .mockRejectedValue(new Error('Failed to create customer'));

      await expect(service.create(createCustomerDto)).rejects.toThrow(
        'Failed to create customer',
      );
      expect(repository.create).toHaveBeenCalledWith(createCustomerDto);
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a customer successfully', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockCustomer);
      repository.save = jest.fn().mockResolvedValue(mockCustomer);

      const updateCustomerDto: UpdateCustomerDto = {
        name: 'Test Customer Updated',
        salary: 6000,
        companyValue: 11000,
      };

      const result = await service.update(1, updateCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockCustomer,
        ...updateCustomerDto,
      });
    });

    it('should throw an error if the customer is not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      const updateCustomerDto: UpdateCustomerDto = {
        name: 'Non-Existent Customer',
        salary: 7000,
        companyValue: 12000,
      };

      await expect(
        service.update(9999, updateCustomerDto),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should update only provided fields', async () => {
      repository.findOne = jest.fn().mockResolvedValue(mockCustomer);
      repository.save = jest.fn().mockResolvedValue(mockCustomer);

      const updateCustomerDto: UpdateCustomerDto = {
        name: 'Test Customer Updated Partial',
      };

      const result = await service.update(1, updateCustomerDto);

      expect(result).toEqual(mockCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...mockCustomer,
        ...updateCustomerDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a customer successfully', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCustomer);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(mockCustomer.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockCustomer.id },
      });
      expect(repository.remove).toHaveBeenCalledWith(mockCustomer);

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCustomer);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      await service.remove(mockCustomer.id);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: mockCustomer.id },
      });
      expect(repository.remove).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw an error if the customer is not found', async () => {
      repository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.remove(9999)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
