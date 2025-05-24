/*
  Warnings:

  - Made the column `tags` on table `Problem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `testcases` on table `Problem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Problem" ALTER COLUMN "tags" SET NOT NULL,
ALTER COLUMN "testcases" SET NOT NULL;
