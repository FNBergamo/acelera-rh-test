import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './customer.entity';
import { ResponseCustomerDto } from './dto/response-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Clientes encontrados com sucesso.',
    type: [ResponseCustomerDto],
  })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente por ID' })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado.',
    type: ResponseCustomerDto,
  })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do cliente' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: Customer,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar dados de um cliente' })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
    type: Customer,
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir cliente' })
  @ApiResponse({ status: 200, description: 'Cliente excluído com sucesso.' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID do cliente' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
