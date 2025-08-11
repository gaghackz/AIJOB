/*
  Warnings:

  - Added the required column `password2` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password2" INTEGER NOT NULL;
