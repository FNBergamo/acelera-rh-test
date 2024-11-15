import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  companyValue: number;
}
