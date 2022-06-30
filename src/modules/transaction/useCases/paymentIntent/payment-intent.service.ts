import { PayableStatus, PrismaClient } from '@prisma/client';
import moment from 'moment';
import { CardType } from '../../../paymentMethod/interfaces/enums/cardType.enum';
import CreateTransactionDto from '../../dtos/create-transaction.dto';
import createTransaction from '../../repositories/create-transaction.repository';

export default class PaymentIntentService {
  constructor() {}

  async execute(createTransactionDto: CreateTransactionDto) {
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

    let setStatus;
    let setFee;
    let setValue;
    let setPaymentDate;

    // FEE LOGIC
    if (paymentMethod.cardType === CardType.credit_card) {
      setStatus = PayableStatus.waiting_funds;
      setFee = 0.5;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().add(30, 'days').format('YYYY-MM-DD');
    } else if (paymentMethod.cardType === CardType.debit_card) {
      setStatus = PayableStatus.paid;
      setFee = 0.3;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().format('YYYY-MM-DD');
    } else {
      setStatus = PayableStatus.pending;
      setFee = 0;
      setValue = value - 100 * setFee;
      setPaymentDate = moment().format('YYYY-MM-DD');
    }

    const newPayable = await prisma.payable.create({
      data: {
        value: setValue,
        fee: setFee,
        paymentDate: setPaymentDate,
        status: setStatus,
        transactionId: (await newTransaction).transactionId,
      },
    });

    return {
      transactions: { ...newTransaction },
      payable: { ...newPayable },
    };
  }
}
