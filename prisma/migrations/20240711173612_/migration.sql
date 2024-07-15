-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "interests" TEXT[],
    "itemHistory" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
