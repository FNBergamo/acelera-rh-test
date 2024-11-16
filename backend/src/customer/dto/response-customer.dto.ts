import { ApiProperty } from '@nestjs/swagger';

export class ResponseCustomerDto {
  @ApiProperty({ description: 'Nome do cliente' })
  name: string;

  @ApiProperty({ description: 'Salário do cliente', type: Number })
  salary: number;

  @ApiProperty({
    description: 'Valor associado à empresa do cliente',
    type: Number,
  })
  companyValue: number;
}
