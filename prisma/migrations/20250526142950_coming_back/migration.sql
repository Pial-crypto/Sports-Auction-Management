-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "team1Id" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "team2Id" TEXT NOT NULL DEFAULT 'N/A';
