/* eslint-disable no-undef */
import moment from 'moment';

import CreatePaymentMethodDto from 'modules/paymentMethod/dtos/create-paymentMethod.dto';
import CreateTransactionDto from '../../createTransaction/dtos/create-transaction.dto';
import CreateTransactionProcessingDto from '../dtos/create-transaction-processing.dto';
import TransactionProcessingService from '../transaction-processing.service';

describe('Transaction Processing Service', () => {
  let transactionProcessingService: TransactionProcessingService;

  beforeAll(() => {
    transactionProcessingService = new TransactionProcessingService();
  });

  it('should return an amount with the card fee discount ', async () => {
    const createPaymentMethodDto: CreatePaymentMethodDto = {
      cardHolderName: 'ISAIAS SANTOS',
      cardNumber: '5418801145888810',
      cardType: 'debit_card',
      cardVerificationValue: 198,
      validThru: '10/14/2022',
    };

    const createTransactionDto: CreateTransactionDto = {
      clientId: 'b72b1146-596e-498b-a8f4-ebeaafba1998',
      customerId: '12ba0be8-4729-429f-aee4-9116ad5ed4dd',
      value: 100,
      description: 'Teclado Mecânico',
    };

    const transactionProcessing: CreateTransactionProcessingDto = {
      createPaymentMethodDto,
      createTransactionDto,
    };

    const newTransactionProcessing = await transactionProcessingService.execute(
      transactionProcessing,
    );

    const { value } = newTransactionProcessing;

    const convertValueToNumber = value.toNumber();

    console.log('valor', value);

    expect(convertValueToNumber).toBe(97);
    expect(convertValueToNumber).toEqual(97);
  });
  it('should return 5% fee if credit card option', async () => {
    const createPaymentMethodDto: CreatePaymentMethodDto = {
      cardHolderName: 'ISAIAS SANTOS',
      cardNumber: '5324522161310041',
      cardType: 'credit_card',
      cardVerificationValue: 321,
      validThru: '07/20/2022',
    };

    const createTransactionDto: CreateTransactionDto = {
      clientId: 'b72b1146-596e-498b-a8f4-ebeaafba1998',
      customerId: '12ba0be8-4729-429f-aee4-9116ad5ed4dd',
      value: 100,
      description: 'Teclado Mecânico',
    };

    const transactionProcessing: CreateTransactionProcessingDto = {
      createPaymentMethodDto,
      createTransactionDto,
    };

    const newTransactionProcessing = await transactionProcessingService.execute(
      transactionProcessing,
    );

    expect(newTransactionProcessing.fee).toEqual(5);
  });
  it('should return date D+30 () if option for credit card and status save with waiting_funds', async () => {
    const createPaymentMethodDto: CreatePaymentMethodDto = {
      cardHolderName: 'ISAIAS SANTOS',
      cardNumber: '4024007103675517',
      cardType: 'credit_card',
      cardVerificationValue: 260,
      validThru: '20/07/2023',
    };

    const createTransactionDto: CreateTransactionDto = {
      clientId: 'b72b1146-596e-498b-a8f4-ebeaafba1998',
      customerId: '12ba0be8-4729-429f-aee4-9116ad5ed4dd',
      value: 100,
      description: 'Teclado Mecânico',
    };

    const transactionProcessing: CreateTransactionProcessingDto = {
      createPaymentMethodDto,
      createTransactionDto,
    };

    const newTransactionProcessing = await transactionProcessingService.execute(
      transactionProcessing,
    );

    const { paymentDate } = newTransactionProcessing;

    const dateD30 = moment().add(30, 'days').format('YYYY-MM-DD');

    expect(paymentDate).toEqual(dateD30);
  });
});
