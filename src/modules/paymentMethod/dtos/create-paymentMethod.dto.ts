export default class PaymentMethodDto {
  cardType: 'debit_card' | 'credit_card';

  cardNumber: string;

  cardHolderName: string;

  validThru: Date;

  cardVerificationValue: number;
}
