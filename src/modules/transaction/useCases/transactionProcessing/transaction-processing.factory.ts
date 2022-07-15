import TransactionProcessingController from './transaction-processing.controller';
import TransactionProcessingService from './transaction-processing.service';

const transactionProcessingFactory = () => {
  const transactionProcessingService = new TransactionProcessingService();
  const transactionProcessingController = new TransactionProcessingController(
    transactionProcessingService,
  );
  return transactionProcessingController;
};

export default transactionProcessingFactory;
