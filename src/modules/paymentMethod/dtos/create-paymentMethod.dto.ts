import { CardType } from '@prisma/client';

export default class CreatePaymentMethodDto {
  cardType: CardType;

  cardNumber: string;

  cardHolderName: string;

  validThru: Date;

  cardVerificationValue: number;
}
