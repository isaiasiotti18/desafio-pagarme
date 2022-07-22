import { PaymentMethod, PayableStatus } from '@prisma/client';
import moment from 'moment';
import { CardType } from '../../../paymentMethod/interfaces/enums/cardType.enum';

export default async function fee(value: number, paymentMethod: PaymentMethod) {
  if (paymentMethod.cardType === CardType.credit_card) {
    return {
      status: PayableStatus.waiting_funds,
      fee: 0.05,
      value: value - 100 * 0.05,
      paymentDate: moment().add(30, 'days').format('YYYY-MM-DD'),
    };
  }

  if (paymentMethod.cardType === CardType.debit_card) {
    return {
      status: PayableStatus.paid,
      fee: 0.03,
      value: value - 100 * 0.03,
      paymentDate: moment().format('YYYY-MM-DD'),
    };
  }
}
