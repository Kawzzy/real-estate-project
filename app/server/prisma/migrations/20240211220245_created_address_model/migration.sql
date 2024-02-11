-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "zipCodeInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_zipCodeInfoId_fkey" FOREIGN KEY ("zipCodeInfoId") REFERENCES "ZipCodeInfo"("zipCode") ON DELETE RESTRICT ON UPDATE CASCADE;
