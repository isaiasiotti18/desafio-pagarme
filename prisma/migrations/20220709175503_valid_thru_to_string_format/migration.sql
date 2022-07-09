/*
  Warnings:

  - Changed the type of `validThru` on the `PaymentMethod` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PaymentMethod" DROP COLUMN "validThru",
ADD COLUMN     "validThru" VARCHAR(10) NOT NULL;
