/*
  Warnings:

  - You are about to drop the column `items` on the `Rules` table. All the data in the column will be lost.
  - Added the required column `tournamentId` to the `Rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rules" DROP COLUMN "items",
ADD COLUMN     "tournamentId" TEXT NOT NULL;
