import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Nome do cliente' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Salário do cliente' })
  salary: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Valor associado à empresa do cliente' })
  companyValue: number;
}
