/*
  Warnings:

  - A unique constraint covering the columns `[contactId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('FOR_RENT', 'FOR_BUY', 'RENTED', 'SOLD');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL');

-- CreateEnum
CREATE TYPE "ResidentialType" AS ENUM ('APARTMENT', 'STUDIO', 'HOUSE', 'LOFT');

-- CreateEnum
CREATE TYPE "CommercialType" AS ENUM ('COMMERCIAL_ROOM', 'HANGAR');

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "telephone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "cod" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "condominium" TEXT NOT NULL,
    "condominiumTax" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "areaSize" INTEGER NOT NULL,
    "builtYear" INTEGER NOT NULL,
    "amenities" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL DEFAULT 1,
    "bedrooms" INTEGER NOT NULL DEFAULT 1,
    "bathrooms" INTEGER NOT NULL DEFAULT 1,
    "kitchen" INTEGER NOT NULL DEFAULT 1,
    "pool" INTEGER NOT NULL DEFAULT 0,
    "heat" INTEGER NOT NULL DEFAULT 0,
    "airConditioner" INTEGER NOT NULL DEFAULT 0,
    "balcony" INTEGER NOT NULL DEFAULT 0,
    "laundry" INTEGER NOT NULL DEFAULT 0,
    "garage" INTEGER NOT NULL DEFAULT 0,
    "elevator" INTEGER NOT NULL DEFAULT 0,
    "livingRoom" INTEGER NOT NULL DEFAULT 0,
    "dinnerRoom" INTEGER NOT NULL DEFAULT 0,
    "restRoom" INTEGER NOT NULL DEFAULT 0,
    "playground" BOOLEAN NOT NULL DEFAULT false,
    "gym" BOOLEAN NOT NULL DEFAULT false,
    "socialSpace" BOOLEAN NOT NULL DEFAULT false,
    "furniture" BOOLEAN NOT NULL DEFAULT false,
    "office" BOOLEAN NOT NULL DEFAULT false,
    "securitySystem" BOOLEAN NOT NULL DEFAULT false,
    "internetAccess" BOOLEAN NOT NULL DEFAULT false,
    "parkingLot" BOOLEAN NOT NULL DEFAULT false,
    "deck" BOOLEAN NOT NULL DEFAULT false,
    "porch" BOOLEAN NOT NULL DEFAULT false,
    "backyard" BOOLEAN NOT NULL DEFAULT false,
    "driveWay" BOOLEAN NOT NULL DEFAULT false,
    "frontYard" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "PropertyStatus" NOT NULL,
    "type" "PropertyType" NOT NULL,
    "commercialType" "CommercialType",
    "residentialType" "ResidentialType",
    "ownerId" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,
    "companyId" TEXT,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Property_cod_key" ON "Property"("cod");

-- CreateIndex
CREATE UNIQUE INDEX "Company_contactId_key" ON "Company"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_addressId_key" ON "Company"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contactId_key" ON "User"("contactId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
