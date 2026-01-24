/*
  Warnings:

  - You are about to drop the column `profileImageUrl` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `Trainer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "profileImageUrl",
ADD COLUMN     "profileImage" TEXT;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "profileImageUrl",
ADD COLUMN     "profileImage" TEXT;
