import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  clientId?: 'b72b1146-596e-498b-a8f4-ebeaafba1998' | string;

  @IsNotEmpty()
  @IsString()
  customerId: string;
}
