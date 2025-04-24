-- CreateTable
CREATE TABLE "otp" (
    "phonenumber" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_phonenumber_key" ON "otp"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");
