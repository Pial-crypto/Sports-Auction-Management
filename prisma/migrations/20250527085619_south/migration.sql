/*
  Warnings:

  - You are about to drop the column `minutes` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "minutes",
ADD COLUMN     "currentTime" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "team1Score" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "team2Score" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "toralOvers" TEXT NOT NULL DEFAULT '0';
