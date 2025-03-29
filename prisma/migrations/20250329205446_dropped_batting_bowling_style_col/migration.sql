/*
  Warnings:

  - You are about to drop the column `battingStyle` on the `PlayerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `bowlingStyle` on the `PlayerRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerRequest" DROP COLUMN "battingStyle",
DROP COLUMN "bowlingStyle";
