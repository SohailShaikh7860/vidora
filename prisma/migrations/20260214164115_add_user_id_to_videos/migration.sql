-- AlterTable
ALTER TABLE "Video" ADD COLUMN "userId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "Video_userId_idx" ON "Video"("userId");
