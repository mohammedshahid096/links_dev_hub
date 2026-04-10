/*
  Warnings:

  - You are about to drop the column `icon` on the `website` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "website" DROP COLUMN "icon",
DROP COLUMN "image",
ADD COLUMN     "iconUrl" VARCHAR(200),
ADD COLUMN     "imageUrl" VARCHAR(200);
