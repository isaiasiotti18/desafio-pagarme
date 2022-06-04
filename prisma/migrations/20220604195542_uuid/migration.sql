-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Payable" ALTER COLUMN "payableId" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "PaymentMethod" ALTER COLUMN "paymentMethodId" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "transactionId" SET DEFAULT gen_random_uuid();
