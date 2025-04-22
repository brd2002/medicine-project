-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "drugLicenseNumber" TEXT NOT NULL,
    "LicenseOwner" TEXT NOT NULL,
    "TradeLicenseNumber" TEXT NOT NULL,
    "ShopName" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "batchSize" INTEGER NOT NULL,
    "totalBatch" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "ManufacturerCompany" TEXT NOT NULL,
    "ExpireDate" TEXT NOT NULL,
    "ManufacturingDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_drugLicenseNumber_key" ON "User"("drugLicenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_LicenseOwner_key" ON "User"("LicenseOwner");

-- CreateIndex
CREATE UNIQUE INDEX "User_TradeLicenseNumber_key" ON "User"("TradeLicenseNumber");
