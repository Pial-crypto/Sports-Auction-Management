-- CreateTable
CREATE TABLE "Rules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "items" TEXT NOT NULL,

    CONSTRAINT "Rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rules" ADD CONSTRAINT "Rules_id_fkey" FOREIGN KEY ("id") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
