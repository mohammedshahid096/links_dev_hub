-- CreateTable
CREATE TABLE "WebsiteWatchlist" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "websiteId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteWatchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WebsiteWatchlist_userId_idx" ON "WebsiteWatchlist"("userId");

-- CreateIndex
CREATE INDEX "WebsiteWatchlist_websiteId_idx" ON "WebsiteWatchlist"("websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteWatchlist_userId_websiteId_key" ON "WebsiteWatchlist"("userId", "websiteId");

-- AddForeignKey
ALTER TABLE "WebsiteWatchlist" ADD CONSTRAINT "WebsiteWatchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteWatchlist" ADD CONSTRAINT "WebsiteWatchlist_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
