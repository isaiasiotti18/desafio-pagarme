export default class CreateTransactionDto {
  value: number;

  description: string;

  paymentMethodId: string;

  clientId?: string;

  customerId: string;
}
