import { PayableStatus } from '@prisma/client';
import { prisma } from 'config/database/prisma-client';
import moment from 'moment';
import { CardType } from '../../../paymentMethod/interfaces/enums/cardType.enum';
import createTransaction from '../createTransaction/create-transaction.function';
import CreatePaymentIntentDto from './dtos/create-payment-intent.dto';

export default class PaymentIntentService {
  async execute(createPaymentIntentDto: CreatePaymentIntentDto) {
    const { value, description, customerId } =
      createPaymentIntentDto.createTransactionDto;

    const {
      cardType,
      cardNumber,
      cardHolderName,
      validThru,
      cardVerificationValue,
    } = createPaymentIntentDto.createPaymentMethodDto;

    const client = await prisma.client.findUnique({
      where: {
        id: 'b72b1146-596e-498b-a8f4-ebeaafba1998',
      },
    });

    if (!client) {
      throw new Error(
        'Um erro inesperado ocorreu na hora de realizar o pagamento.',
      );
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new Error(
        'Um erro inesperado ocorreu na hora de realizar o pagamento.',
      );
    }

    const lastCardNumbers = cardNumber.substring(-4);

    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        cardType,
        cardNumber: lastCardNumbers,
        cardHolderName,
        validThru,
        cardVerificationValue,
        customerId,
      },
    });

    if (!paymentMethod) {
      throw new Error(
        'Um erro inesperado ocorreu na hora de realizar o pagamento.',
      );
    }

    const newTransaction = createTransaction(
      {
        value,
        description,
        clientId: client.id,
        customerId: customer.id,
      },
      paymentMethod.paymentMethodId,
    );

    let setStatus;
    let setFee;
    let setValue;
    let setPaymentDate;

    // FEE LOGIC
    if (paymentMethod.cardType === CardType.credit_card) {
      setStatus = PayableStatus.waiting_funds;
      setFee = 0.05;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().add(30, 'days').format('MM-DD-YYYY hh:mm:ss');
    } else if (paymentMethod.cardType === CardType.debit_card) {
      setStatus = PayableStatus.paid;
      setFee = 0.03;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().format('MM-DD-YYYY hh:mm:ss');
    } else {
      setStatus = PayableStatus.pending;
      setFee = 0;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().format('MM-DD-YYYY hh:mm:ss');
    }

    const newPayable = await prisma.payable.create({
      data: {
        value: setValue,
        fee: setFee * 100,
        paymentDate: moment(setPaymentDate).toDate(),
        status: setStatus,
        transactionId: (await newTransaction).transactionId,
      },
    });

    return {
      payable: { ...newPayable },
    };
  }
}
