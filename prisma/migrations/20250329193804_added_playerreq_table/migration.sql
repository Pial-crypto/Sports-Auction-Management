-- CreateTable
CREATE TABLE "PlayerRequest" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'N/A',
    "playerId" TEXT NOT NULL DEFAULT 'N/A',
    "achievements" TEXT NOT NULL DEFAULT 'N/A',
    "age" TEXT NOT NULL DEFAULT 'N/A',
    "battingStyle" TEXT NOT NULL DEFAULT 'N/A',
    "bowlingStyle" TEXT NOT NULL DEFAULT 'N/A',
    "experience" TEXT NOT NULL DEFAULT 'N/A',
    "previousTeam" TEXT NOT NULL DEFAULT 'N/A',
    "role" TEXT NOT NULL,

    CONSTRAINT "PlayerRequest_pkey" PRIMARY KEY ("id")
);
