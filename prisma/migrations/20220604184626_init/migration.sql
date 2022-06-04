-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('debit_card', 'credit_card');

-- CreateEnum
CREATE TYPE "PayableStatus" AS ENUM ('pending', 'paid', 'waiting_funds');

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "cnpj" VARCHAR(20) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(36) NOT NULL,
    "availableBalance" MONEY NOT NULL DEFAULT 0,
    "waitingFunds" MONEY NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "Cpf" VARCHAR(16) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "paymentMethodId" UUID NOT NULL,
    "cardType" "CardType" NOT NULL,
    "cardNumber" VARCHAR(50) NOT NULL,
    "cardHolderName" VARCHAR(25) NOT NULL,
    "validThru" DATE NOT NULL,
    "cardVerificationValue" SMALLINT NOT NULL,
    "customerId" UUID,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("paymentMethodId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" UUID NOT NULL,
    "value" MONEY NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'No description',
    "customerId" UUID,

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
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cnpj_key" ON "Client"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

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
CREATE UNIQUE INDEX "PaymentMethod_cardVerificationValue_key" ON "PaymentMethod"("cardVerificationValue");

-- CreateIndex
CREATE UNIQUE INDEX "Payable_status_key" ON "Payable"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Payable_transactionId_key" ON "Payable"("transactionId");

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payable" ADD CONSTRAINT "Payable_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;
