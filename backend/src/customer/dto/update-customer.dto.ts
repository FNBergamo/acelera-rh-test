import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Nome do cliente' })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Salário do cliente' })
  salary?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'Valor associado à empresa do cliente' })
  companyValue?: number;
}
