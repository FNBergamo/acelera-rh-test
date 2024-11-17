import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Customer } from './customer.entity';
import { ResponseCustomerDto } from './dto/response-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os clientes com paginação' })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Número da página (opcional, padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description:
      'Número de registros por página (opcional, padrão: 16, máximo: 40)',
  })
  @ApiResponse({
    status: 200,
    description: 'Clientes encontrados com sucesso.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#/components/schemas/ResponseCustomerDto' },
        },
        total: { type: 'number', description: 'Total de clientes encontrados' },
      },
    },
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 16) {
    return this.customerService.findAll(page, limit);
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
