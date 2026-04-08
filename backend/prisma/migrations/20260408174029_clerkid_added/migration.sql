/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `profileUrl` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(400)`.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "clerkId" VARCHAR(200) NOT NULL,
ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'GOOGLE',
ALTER COLUMN "profileUrl" SET DATA TYPE VARCHAR(400);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
