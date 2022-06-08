import { CardType } from '../interfaces/enums/cardType.enum';

export default class PaymentMethodDto {
  cardType: CardType;

  cardNumber: string;

  cardHolderName: string;

  validThru: Date;

  cardVerificationValue: number;
}
