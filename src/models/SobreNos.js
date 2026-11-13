import prisma from '../lib/prismaClient.js';


export default class SobreNosModel {
    constructor({ id, nomeProjeto= null, descricao = null, objetivo = null, membros= null, contatos= null   } = {}) {
        this.id = id;
        this.nomeProjeto = nomeProjeto;
        this.descricao = descricao;
        this.objetivo = objetivo;
        this.membros = membros;
        this.contatos = contatos;

    }

    async criar() {
        return prisma.SobreNos.create({
            data: {
                nomeProjeto: this.nomeProjeto,
                descricao: this.descricao,
                objetivo: this.objetivo,
                membros: this.membros,
                contatos: this.contatos
            },
        });
    }

    async atualizar() {
        return prisma.SobreNos.update({
            where: { id: this.id },
            data: { nomeProjeto: this.nomeProjeto, 
                descricao: this.descricao, 
                objetivo: this.objetivo,
                membros: this.membros,
                contatos: this.contatos },
        });
    }

    async deletar() {
        return prisma.SobreNos.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nomeProjeto) {
            where.nomeProjeto = { contains: filtros.nomeProjeto, mode: 'insensitive' };
        }
        if (filtros.descricao) {
            where.descricao = { contains: filtros.descricao, mode: 'insensitive' };
        }
        if (filtros.objetivo) {
            where.objetivo = { contains: filtros.objetivo, mode: 'insensitive' };
        }
        if (filtros.membros) {
            where.membros = { contains: filtros.membros, mode: 'insensitive' };
        }
        if (filtros.contatos) {
            where.contatos = { contains: filtros.contatos, mode: 'insensitive' };
        }

        return prisma.SobreNos.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.SobreNos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new SobreNosModel(data);
    }
}