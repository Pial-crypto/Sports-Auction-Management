/*
  Warnings:

  - Added the required column `tournamentId` to the `bidding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bidding" ADD COLUMN     "tournamentId" TEXT NOT NULL;
