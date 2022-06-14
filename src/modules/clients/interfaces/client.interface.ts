import { Decimal } from '@prisma/client/runtime';

export default interface ClientInterface {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  password: string;
  availableBalance: number | Decimal;
  waitingFunds: number | Decimal;
}
