-- CreateTable
CREATE TABLE "GithubRepo" (
    "id" UUID NOT NULL,
    "repoId" INTEGER NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "repoName" VARCHAR(200) NOT NULL,
    "description" VARCHAR(1000),
    "url" VARCHAR(255) NOT NULL,
    "language" VARCHAR(50),
    "topics" VARCHAR(100)[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID NOT NULL,
    "websiteId" UUID,

    CONSTRAINT "GithubRepo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepo_repoId_key" ON "GithubRepo"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubRepo_websiteId_key" ON "GithubRepo"("websiteId");

-- CreateIndex
CREATE INDEX "GithubRepo_username_idx" ON "GithubRepo"("username");

-- AddForeignKey
ALTER TABLE "GithubRepo" ADD CONSTRAINT "GithubRepo_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubRepo" ADD CONSTRAINT "GithubRepo_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
