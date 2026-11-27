import prisma from '../lib/prismaClient.js';

export default class UsuarioModel {
    constructor({
        id,
        nome = null,
        email = null,
        senha = null,
        ativo = true,
        criadoEm = null,
        atualizadoEm = null
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    }

    async criar() {
        return prisma.usuario.create({
            data: {
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                ativo: this.ativo
            }
        });
    }

    async atualizar() {
        return prisma.usuario.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                ativo: this.ativo
            }
        });
    }

    async deletar() {
        return prisma.usuario.delete({
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

        if (filtros.email) {
            where.email = {
                contains: filtros.email.trim().toLowerCase(),
                mode: 'insensitive'
            };
        }

        if (filtros.ativo === 'true' || filtros.ativo === true) {
            where.ativo = true;
        } else if (filtros.ativo === 'false' || filtros.ativo === false) {
            where.ativo = false;
        }

        return prisma.usuario.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.usuario.findUnique({
            where: { id }
        });

        return data ? new UsuarioModel(data) : null;
    }

    static async buscarPorEmail(email) {
        const data = await prisma.usuario.findUnique({
            where: { email }
        });

        return data ? new UsuarioModel(data) : null;
    }
}
