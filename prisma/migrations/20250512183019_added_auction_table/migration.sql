-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "managerId" TEXT NOT NULL DEFAULT 'N/A',
    "teamId" TEXT NOT NULL DEFAULT 'N/A',
    "teamName" TEXT NOT NULL DEFAULT 'N/A',
    "soldStatus" TEXT NOT NULL DEFAULT 'Unsold',

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);
