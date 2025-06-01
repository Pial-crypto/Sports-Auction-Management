-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "manOfTheMatch" TEXT NOT NULL DEFAULT 'node';

-- CreateTable
CREATE TABLE "PlayerPerformance" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL DEFAULT 'default-tournament',
    "teamId" TEXT NOT NULL DEFAULT 'default-team',
    "playerId" TEXT NOT NULL DEFAULT 'default-id',
    "matchId" TEXT NOT NULL DEFAULT 'default-match',
    "ballsFaced" INTEGER NOT NULL DEFAULT 0,
    "overs" INTEGER NOT NULL DEFAULT 0,
    "runsScored" INTEGER NOT NULL DEFAULT 0,
    "wickets" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "cards" TEXT NOT NULL DEFAULT 'none',

    CONSTRAINT "PlayerPerformance_pkey" PRIMARY KEY ("id")
);
