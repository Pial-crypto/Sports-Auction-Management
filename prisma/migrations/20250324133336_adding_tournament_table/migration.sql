-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournamentDate" TIMESTAMP(3) NOT NULL,
    "registrationFee" INTEGER NOT NULL,
    "prizeMoney" INTEGER NOT NULL,
    "numberOfTeams" INTEGER NOT NULL,
    "rules" TEXT NOT NULL,
    "tournamentIcon" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "match" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "winner" TEXT NOT NULL DEFAULT 'N/A',
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
