import prisma from '../lib/prismaClient.js';

export default class QuestaoSimuladoModel {
    constructor({
        id,
        simuladoId,
        enunciado,
        imagem = null,
        alternativas,
        respostaCorreta,
        explicacao = null,
        ordem = 0
    } = {}) {
        this.id = id;
        this.simuladoId = simuladoId;
        this.enunciado = enunciado;
        this.imagem = imagem;
        this.alternativas = alternativas;
        this.respostaCorreta = respostaCorreta;
        this.explicacao = explicacao;
        this.ordem = ordem;
    }

    async criar() {
        return prisma.questaoSimulado.create({
            data: {
                simuladoId: this.simuladoId,
                enunciado: this.enunciado,
                imagem: this.imagem,
                alternativas: this.alternativas,
                respostaCorreta: this.respostaCorreta,
                explicacao: this.explicacao,
                ordem: this.ordem
            }
        });
    }

    async atualizar() {
        return prisma.questaoSimulado.update({
            where: { id: this.id },
            data: {
                simuladoId: this.simuladoId,
                enunciado: this.enunciado,
                imagem: this.imagem,
                alternativas: this.alternativas,
                respostaCorreta: this.respostaCorreta,
                explicacao: this.explicacao,
                ordem: this.ordem
            }
        });
    }

    async deletar() {
        return prisma.questaoSimulado.delete({
            where: { id: this.id }
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.simuladoId !== undefined) {
            where.simuladoId = filtros.simuladoId;
        }

        if (filtros.enunciado) {
            where.enunciado = {
                contains: filtros.enunciado,
                mode: 'insensitive'
            };
        }

        return prisma.questaoSimulado.findMany({
            where,
            orderBy: [{ ordem: 'asc' }, { id: 'asc' }]
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.questaoSimulado.findUnique({
            where: { id }
        });

        return data ? new QuestaoSimuladoModel(data) : null;
    }
}
