/*
  Warnings:

  - You are about to drop the column `subject` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `loanAmount` on the `MortgageRequest` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `MortgageRequest` table. All the data in the column will be lost.
  - You are about to drop the column `repaymentPeriod` on the `MortgageRequest` table. All the data in the column will be lost.
  - Added the required column `userId` to the `MortgageRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "subject";

-- AlterTable
ALTER TABLE "MortgageRequest" DROP COLUMN "loanAmount",
DROP COLUMN "propertyId",
DROP COLUMN "repaymentPeriod",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MortgageRequest" ADD CONSTRAINT "MortgageRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
