/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
import { prisma } from 'config/database/prisma-client';

export default class ListTransactionService {
  async execute(customerId: string) {
    const listTransactions = await prisma.transaction.findMany({
      where: {
        customerId,
      },
      select: {
        value: true,
        description: true,
        paymentMethod: {
          select: {
            cardType: true,
            cardNumber: true,
            cardHolderName: true,
            validThru: true,
            cardVerificationValue: true,
          },
        },
        customerId: false,
      },
    });

    return listTransactions;
  }
}
