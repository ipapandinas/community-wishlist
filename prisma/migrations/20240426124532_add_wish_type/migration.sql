/*
  Warnings:

  - Added the required column `type` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WishType" AS ENUM ('protocol', 'dapp', 'tool');

-- AlterTable
DELETE FROM "Wish";