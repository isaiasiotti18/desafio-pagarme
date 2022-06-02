-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('debit_card', 'credit_card');

-- CreateEnum
CREATE TYPE "PayableStatus" AS ENUM ('pending', 'paid', 'waiting_funds');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "availableBalance" MONEY NOT NULL DEFAULT 0,
    "waitingFunds" MONEY NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "paymentMethodId" UUID NOT NULL,
    "cardType" "CardType" NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardHolderName" TEXT NOT NULL,
    "validThru" DATE NOT NULL,
    "CustomerId" TEXT,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("paymentMethodId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" UUID NOT NULL,
    "value" MONEY NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'No description',
    "paymentMethodId" UUID,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "Payable" (
    "payableId" UUID NOT NULL,
    "value" MONEY NOT NULL,
    "status" "PayableStatus" NOT NULL,
    "paymentDate" DATE NOT NULL,
    "Fee" INTEGER NOT NULL,
    "transactionId" UUID NOT NULL,

    CONSTRAINT "Payable_pkey" PRIMARY KEY ("payableId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Cpf_key" ON "Customer"("Cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_cardType_key" ON "PaymentMethod"("cardType");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_cardNumber_key" ON "PaymentMethod"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_cardHolderName_key" ON "PaymentMethod"("cardHolderName");

-- CreateIndex
CREATE UNIQUE INDEX "Payable_status_key" ON "Payable"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payable_transactionId_key" ON "Payable"("transactionId");

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
