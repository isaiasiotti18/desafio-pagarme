import { CardType } from './../../paymentMethod/interfaces/enums/cardType.enum';
import { PrismaClient } from '@prisma/client';
import CreateTransactionDto from '../dtos/create-transaction.dto';
import createTransaction from '../repositories/create-transaction.repository';

export default async function paymentIntentService(
  createTransactionDto: CreateTransactionDto,
) {
  const { value, description, paymentMethodId, customerId, clientId } =
    createTransactionDto;

  const prisma = new PrismaClient();

  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
  });

  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  const paymentMethod = await prisma.paymentMethod.findUnique({
    where: {
      paymentMethodId,
    },
  });

  if (client === null || customer === null || paymentMethod === null) {
    throw new Error(
      'Um erro inesperado ocorreu na hora de realizar o pagamento.',
    );
  }

  const newTransaction = createTransaction({
    value,
    description,
    clientId: client.id,
    customerId: customer.id,
    paymentMethodId: paymentMethod.paymentMethodId,
  });

  // FEE LOGIC
  let fee;
  if (paymentMethod.cardType === CardType.credit_card) {
    fee = 5;
  } else if (paymentMethod.cardType === CardType.debit_card) {
    fee = 3;
  }

  const newPayable = await prisma.payable.create({
    data: {
      value,
      status: ,
      paymentDate,
      fee,
    },
  });

  return {
    transactions: { ...newTransaction },
    payable: { ...newPayable },
  };
}
