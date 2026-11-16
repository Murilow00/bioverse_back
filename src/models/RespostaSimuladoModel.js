import prisma from '../lib/prismaClient.js';

export default class RespostaSimuladoModel {
    constructor({
        id,
        nome_aluno = null,
        simuladoId,
        acertos,
        total_questoes,
        percentual,
        tempo_gasto = null,
        realizado_em
    } = {}) {
        this.id = id;
        this.nome_aluno = nome_aluno;
        this.simuladoId = simuladoId;
        this.acertos = acertos;
        this.total_questoes = total_questoes;
        this.percentual = percentual;
        this.tempo_gasto = tempo_gasto;
        this.realizado_em = realizado_em;
    }

    async criar() {
        const data = {
            nome_aluno: this.nome_aluno,
            simuladoId: this.simuladoId,
            acertos: this.acertos,
            total_questoes: this.total_questoes,
            percentual: this.percentual,
            tempo_gasto: this.tempo_gasto
        };

        if (this.realizado_em !== undefined) {
            data.realizado_em = this.realizado_em;
        }

        return prisma.respostaSimulado.create({ data });
    }

    async atualizar() {
        const data = {
            nome_aluno: this.nome_aluno,
            simuladoId: this.simuladoId,
            acertos: this.acertos,
            total_questoes: this.total_questoes,
            percentual: this.percentual,
            tempo_gasto: this.tempo_gasto
        };

        if (this.realizado_em !== undefined) {
            data.realizado_em = this.realizado_em;
        }

        return prisma.respostaSimulado.update({
            where: { id: this.id },
            data
        });
    }

    async deletar() {
        return prisma.respostaSimulado.delete({
            where: { id: this.id }
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.simuladoId !== undefined) {
            where.simuladoId = filtros.simuladoId;
        }

        if (filtros.nome_aluno) {
            where.nome_aluno = {
                contains: filtros.nome_aluno,
                mode: 'insensitive'
            };
        }

        return prisma.respostaSimulado.findMany({
            where,
            orderBy: [{ realizado_em: 'desc' }, { id: 'desc' }]
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.respostaSimulado.findUnique({
            where: { id }
        });

        return data ? new RespostaSimuladoModel(data) : null;
    }
}
