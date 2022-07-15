import CreatePaymentMethodDto from '../../../../paymentMethod/dtos/create-paymentMethod.dto';
import CreateTransactionDto from '../../createTransaction/dtos/create-transaction.dto';

export default class CreateTransactionProcessingDto {
  createTransactionDto: CreateTransactionDto;

  createPaymentMethodDto: CreatePaymentMethodDto;
}
