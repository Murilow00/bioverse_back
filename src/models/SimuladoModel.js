import prisma from '../lib/prismaClient.js';


export default class SimuladoModel {
    constructor({ id = null, titulo, descricao, disciplina, questoes, tempo, quantidade_questoes, publicado, criada, atualizada } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.disciplina = disciplina;
        this.questoes = questoes;
        this.tempo = tempo;
        this.quantidade_questoes = quantidade_questoes;
        this.publicado = publicado;
        this.criada = criada;
        this.atualizada = atualizada;
    }

    async criar() {
        return prisma.simulado.create({
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                disciplina: this.disciplina,
                questoes: this.questoes,
                tempo: this.tempo,
                quantidade_questoes: this.quantidade_questoes,
                publicado: this.publicado,
                criada: this.criada,
                atualizada: this.atualizada,
            },
        });
    }

    async atualizar() {
        return prisma.simulado.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                disciplina: this.disciplina,
                questoes: this.questoes,
                tempo: this.tempo,
                quantidade_questoes: this.quantidade_questoes,
                publicado: this.publicado,
                criada: this.criada,
                atualizada: this.atualizada,
            },
        });
    }

    async deletar() {
        return prisma.simulado.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }

        return prisma.simulado.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.simulado.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new SimuladoModel(data);
    }
} 7