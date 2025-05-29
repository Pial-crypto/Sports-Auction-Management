-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "team1Points" TEXT NOT NULL DEFAULT '0',
ADD COLUMN     "team2Points" TEXT NOT NULL DEFAULT '0';
