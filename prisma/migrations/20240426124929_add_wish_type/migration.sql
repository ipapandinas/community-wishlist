/*
  Warnings:

  - Added the required column `type` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" ADD COLUMN     "type" "WishType" NOT NULL;
