-- CreateTable
CREATE TABLE "tournamentAuctionStatus" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "auctionStatus" TEXT NOT NULL DEFAULT 'finished',

    CONSTRAINT "tournamentAuctionStatus_pkey" PRIMARY KEY ("id")
);
