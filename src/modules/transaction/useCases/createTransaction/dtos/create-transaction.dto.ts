import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  clientId?: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;
}
