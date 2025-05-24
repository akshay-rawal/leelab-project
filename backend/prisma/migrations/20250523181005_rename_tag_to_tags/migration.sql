/*
  Warnings:

  - You are about to drop the column `tag` on the `Problem` table. All the data in the column will be lost.
  - The `constraints` column on the `Problem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT,
DROP COLUMN "constraints",
ADD COLUMN     "constraints" TEXT[];
