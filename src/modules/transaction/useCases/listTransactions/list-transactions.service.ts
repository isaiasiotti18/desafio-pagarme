/* eslint-disable no-unreachable-loop */
/* eslint-disable no-restricted-syntax */
import { prisma } from 'config/database/prisma-client';

export default class ListTransactionService {
  async execute(customerId: string) {
    const listTransactions = await prisma.transaction.findMany({
      where: {
        customerId,
      },
    });

    return listTransactions.map(async transaction => {
      const paymentMethod = await prisma.paymentMethod.findUnique({
        where: {
          paymentMethodId: transaction.paymentMethodId,
        },
      });

      return {
        valor_transacao: transaction.value,
        descricao: transaction.description,
        forma_pagamento: paymentMethod?.cardType,
        numero_cartao: paymentMethod?.cardNumber,
        portador_cartao: paymentMethod?.cardHolderName,
        valid_thru: paymentMethod?.validThru,
        cvv: paymentMethod?.cardVerificationValue,
      };
    });
  }
}
