/*
  Warnings:

  - You are about to drop the column `manOfTheMatch` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "manOfTheMatch",
ADD COLUMN     "manOfTheMatchId" TEXT NOT NULL DEFAULT 'none',
ADD COLUMN     "manOfTheMatchName" TEXT NOT NULL DEFAULT 'none';
