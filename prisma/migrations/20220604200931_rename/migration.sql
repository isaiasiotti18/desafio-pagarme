/*
  Warnings:

  - You are about to drop the column `Cpf` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Fee` on the `Payable` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `Payable` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_Cpf_key";

-- AlterTable
ALTER TABLE "Customer" RENAME COLUMN "Cpf" to "cpf";

-- AlterTable
ALTER TABLE "Payable" RENAME COLUMN "Fee" to "fee";
