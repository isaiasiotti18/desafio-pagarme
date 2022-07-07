import ListTransactionsController from './list-transactions.controller';
import ListTransactionService from './list-transactions.service';

const listTransactionsFactory = () => {
  const listTransactionsService = new ListTransactionService();
  const listTransactionsController = new ListTransactionsController(
    listTransactionsService,
  );
  return listTransactionsController;
};

export default listTransactionsFactory;
