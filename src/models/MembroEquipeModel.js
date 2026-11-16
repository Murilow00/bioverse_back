
import prisma from '../lib/prismaClient.js';

export default class MembroEquipeModel {
    constructor({
        id,
        nome = null,
        funcao = null,
        bio = null,
        foto = null,
        ordem = 0,
        ativo = true
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.funcao = funcao;
        this.bio = bio;
        this.foto = foto;
        this.ordem = ordem;
        this.ativo = ativo;
    }

    async criar() {
        return prisma.membroEquipe.create({
            data: {
                nome: this.nome,
                funcao: this.funcao,
                bio: this.bio,
                foto: this.foto,
                ordem: this.ordem,
                ativo: this.ativo
            }
        });
    }

    async atualizar() {
        return prisma.membroEquipe.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                funcao: this.funcao,
                bio: this.bio,
                foto: this.foto,
                ordem: this.ordem,
                ativo: this.ativo
            }
        });
    }

    async deletar() {
        return prisma.membroEquipe.delete({
            where: { id: this.id }
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = {
                contains: filtros.nome,
                mode: 'insensitive'
            };
        }

        if (filtros.funcao) {
            where.funcao = {
                contains: filtros.funcao,
                mode: 'insensitive'
            };
        }

        if (filtros.ativo !== undefined) {
            where.ativo = filtros.ativo === 'true' ||
                filtros.ativo === true;
        }

        return prisma.membroEquipe.findMany({
            where,
            orderBy: {
                ordem: 'asc'
            }
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.membroEquipe.findUnique({
            where: { id }
        });

        if (!data) {
            return null;
        }

        return new MembroEquipeModel(data);
    }
}
