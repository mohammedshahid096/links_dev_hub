-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "inputTokens" DROP NOT NULL,
ALTER COLUMN "outputTokens" DROP NOT NULL,
ALTER COLUMN "totalTokens" DROP NOT NULL;
