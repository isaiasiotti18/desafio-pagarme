/*
  Warnings:

  - You are about to drop the column `paymentMethodPaymentMethodId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodPaymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentMethodPaymentMethodId",
ADD COLUMN     "paymentMethodId" UUID;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE SET NULL ON UPDATE CASCADE;
