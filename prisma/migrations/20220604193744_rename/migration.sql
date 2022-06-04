/*
  Warnings:

  - Made the column `customerId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `paymentMethodId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "clientId" SET NOT NULL,
ALTER COLUMN "paymentMethodId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE RESTRICT ON UPDATE CASCADE;
