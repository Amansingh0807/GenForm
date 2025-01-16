-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "subscribed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" SET DATA TYPE TEXT;
