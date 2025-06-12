-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
