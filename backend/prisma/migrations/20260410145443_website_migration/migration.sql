-- AlterTable
ALTER TABLE "website" ADD COLUMN     "scrapedData" JSONB,
ADD COLUMN     "sourceType" VARCHAR(50);
