/*
  Warnings:

  - You are about to drop the `Rules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rules" DROP CONSTRAINT "Rules_id_fkey";

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "rules" TEXT NOT NULL DEFAULT 'N/A';

-- DropTable
DROP TABLE "Rules";
