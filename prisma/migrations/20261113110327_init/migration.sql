/*
  Warnings:

  - You are about to drop the `exemplo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "exemplo";

-- CreateTable
CREATE TABLE "noticia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT,
    "conteudo_completo" TEXT,
    "img" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "categoria" TEXT,
    "publicada" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carreiras" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "cursos_relacionados" TEXT[],
    "profissoes" TEXT[],
    "habilidades" TEXT[],
    "img" TEXT,
    "salario_medio" TEXT,
    "area" TEXT,
    "criada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carreiras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dica" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "conteudo" TEXT,
    "categoria" TEXT,
    "img" TEXT,
    "urlFonte" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "criada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estagio" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT,
    "descricao" TEXT,
    "requisitos" TEXT,
    "cursos" TEXT[],
    "modalidade" TEXT,
    "bolsa_auxilio" TEXT,
    "carga_horaria" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estagio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulado" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "disciplina" TEXT,
    "tempo" INTEGER,
    "quantidade_questoes" INTEGER,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "criada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questao_simulado" (
    "id" SERIAL NOT NULL,
    "simuladoId" INTEGER NOT NULL,
    "enunciado" TEXT NOT NULL,
    "imagem" TEXT,
    "alternativas" TEXT[],
    "respostaCorreta" INTEGER NOT NULL,
    "explicacao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "questao_simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resposta_simulado" (
    "id" SERIAL NOT NULL,
    "nome_aluno" TEXT,
    "simuladoId" INTEGER NOT NULL,
    "acertos" INTEGER NOT NULL,
    "total_questoes" INTEGER NOT NULL,
    "percentual" DOUBLE PRECISION NOT NULL,
    "tempo_gasto" INTEGER,
    "realizado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resposta_simulado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "url" TEXT NOT NULL,
    "plataforma" TEXT,
    "thumbnail" TEXT,
    "disciplina" TEXT,
    "duracao" TEXT,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "criada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sobre_nos" (
    "id" SERIAL NOT NULL,
    "nomeProjeto" TEXT NOT NULL,
    "descricao" TEXT,
    "objetivo" TEXT,
    "membros" TEXT[],
    "contatos" TEXT[],

    CONSTRAINT "sobre_nos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro_equipe" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" TEXT,
    "bio" TEXT,
    "foto" TEXT,
    "ordem" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "membro_equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimoLogin" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administrador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "noticia_data_idx" ON "noticia"("data");

-- CreateIndex
CREATE INDEX "noticia_publicada_destaque_idx" ON "noticia"("publicada", "destaque");

-- CreateIndex
CREATE INDEX "estagio_ativo_idx" ON "estagio"("ativo");

-- CreateIndex
CREATE INDEX "resposta_simulado_simuladoId_idx" ON "resposta_simulado"("simuladoId");

-- CreateIndex
CREATE INDEX "video_publicado_ordem_idx" ON "video"("publicado", "ordem");

-- CreateIndex
CREATE UNIQUE INDEX "administrador_email_key" ON "administrador"("email");

-- AddForeignKey
ALTER TABLE "questao_simulado" ADD CONSTRAINT "questao_simulado_simuladoId_fkey" FOREIGN KEY ("simuladoId") REFERENCES "simulado"("id") ON DELETE CASCADE ON UPDATE CASCADE;
