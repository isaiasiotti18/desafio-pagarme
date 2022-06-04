-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentMethodPaymentMethodId" UUID;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodPaymentMethodId_fkey" FOREIGN KEY ("paymentMethodPaymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE SET NULL ON UPDATE CASCADE;
