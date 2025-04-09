-- CreateTable
CREATE TABLE "TeamRequest" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "teamName" TEXT NOT NULL DEFAULT 'N/A',
    "managerId" TEXT NOT NULL DEFAULT 'N/A',
    "managerEmail" TEXT NOT NULL DEFAULT 'N/A',
    "managerName" TEXT NOT NULL DEFAULT 'N/A',
    "managerNumber" TEXT NOT NULL DEFAULT 'N/A',
    "previousTournament" TEXT NOT NULL DEFAULT 'N/A',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rejected" BOOLEAN NOT NULL DEFAULT false,
    "rejectionReason" TEXT NOT NULL DEFAULT 'N/A',

    CONSTRAINT "TeamRequest_pkey" PRIMARY KEY ("id")
);
