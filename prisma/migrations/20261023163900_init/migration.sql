-- CreateTable
CREATE TABLE "exemplo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT,
    "documento" TEXT,

    CONSTRAINT "exemplo_pkey" PRIMARY KEY ("id")
);
