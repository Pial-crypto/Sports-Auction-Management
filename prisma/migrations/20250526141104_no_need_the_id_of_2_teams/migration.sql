-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "team1Name" TEXT NOT NULL DEFAULT 'N/A',
    "team2Name" TEXT NOT NULL DEFAULT 'N/A',
    "status" TEXT NOT NULL DEFAULT 'Upcoming',
    "type" TEXT NOT NULL DEFAULT 'Knockout',
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "venue" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);
