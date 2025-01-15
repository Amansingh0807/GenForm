/*
  Warnings:

  - You are about to drop the column `sgareUrl` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `submission` on the `Form` table. All the data in the column will be lost.
  - The required column `shareUrl` was added to the `Form` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "sgareUrl",
DROP COLUMN "submission",
ADD COLUMN     "shareUrl" TEXT NOT NULL,
ADD COLUMN     "submissions" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "plan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
