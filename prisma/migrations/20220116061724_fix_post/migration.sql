/*
  Warnings:

  - You are about to drop the column `text` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `name` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('READY', 'DONE');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "text",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT E'READY';
