/* eslint-disable no-const-assign */
/* eslint-disable no-unsafe-optional-chaining */
import { PayableStatus } from '@prisma/client';
import { prisma } from 'config/database/prisma-client';
import moment from 'moment';
import createTransaction from '../createTransaction/create-transaction.function';
import CreateTransactionProcessingDto from './dtos/create-transaction-processing.dto';
import fee from './fee.functions';

export default class TransactionProcessingService {
  async execute(
    createTransactionProcessingDto: CreateTransactionProcessingDto,
  ) {
    const { value, description, customerId } =
      createTransactionProcessingDto.createTransactionDto;

    const {
      cardType,
      cardNumber,
      cardHolderName,
      validThru,
      cardVerificationValue,
    } = createTransactionProcessingDto.createPaymentMethodDto;

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

    // Se já existir a forma de pagamento

    let paymentMethod = await prisma.paymentMethod.findUnique({
      where: {
        cardNumber,
      },
    });

    if (!paymentMethod) {
      paymentMethod = await prisma.paymentMethod.create({
        data: {
          cardType,
          cardNumber: lastCardNumbers,
          cardHolderName,
          validThru,
          cardVerificationValue,
          customerId,
        },
      });
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

    // LOGICA DO FEE
    const feeLogic = await fee(value, paymentMethod);

    const newPayable = await prisma.payable.create({
      data: {
        value: feeLogic?.value!,
        fee: feeLogic?.fee! * 100,
        paymentDate: moment(feeLogic?.paymentDate).toDate(),
        status: feeLogic?.status!,
        transactionId: (await newTransaction).transactionId,
        clientId: client.id,
      },
    });

    // Logica dos recebiveis do cliente
    if (newPayable.status === PayableStatus.waiting_funds) {
      await prisma.client.update({
        where: {
          id: client.id,
        },
        data: {
          waitingFunds: { increment: newPayable.value },
        },
      });
    } else if (newPayable.status === PayableStatus.paid) {
      await prisma.client.update({
        where: {
          id: client.id,
        },
        data: {
          availableBalance: { increment: newPayable.value },
        },
      });
    }

    return {
      payable: { ...newPayable },
    };
  }
}
