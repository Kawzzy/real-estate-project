/*
  Warnings:

  - The primary key for the `ZipCodeInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_zipCodeInfoId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "zipCodeInfoId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ZipCodeInfo" DROP CONSTRAINT "ZipCodeInfo_pkey",
ALTER COLUMN "zipCode" SET DATA TYPE TEXT,
ADD CONSTRAINT "ZipCodeInfo_pkey" PRIMARY KEY ("zipCode");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_zipCodeInfoId_fkey" FOREIGN KEY ("zipCodeInfoId") REFERENCES "ZipCodeInfo"("zipCode") ON DELETE RESTRICT ON UPDATE CASCADE;
