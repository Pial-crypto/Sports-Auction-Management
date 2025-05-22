/*
  Warnings:

  - The `soldStatus` column on the `Auction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Auction" DROP COLUMN "soldStatus",
ADD COLUMN     "soldStatus" BOOLEAN NOT NULL DEFAULT false;
