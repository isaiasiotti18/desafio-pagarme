import { CardType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsEnum(CardType)
  cardType: CardType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(10)
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  validThru: string;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(4)
  cardVerificationValue: number;
}
