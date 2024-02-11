-- CreateTable
CREATE TABLE "ZipCodeInfo" (
    "zipCode" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZipCodeInfo_pkey" PRIMARY KEY ("zipCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZipCodeInfo_zipCode_key" ON "ZipCodeInfo"("zipCode");
