
import prisma from '../lib/prismaClient.js';

export default class AdministradorModel {
    constructor({
        id,
        nome = null,
        email = null,
        senha = null,
        ativo = true,
        ultimoLogin = null,
        criadoEm = null,
        atualizadoEm = null
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
        this.ultimoLogin = ultimoLogin;
        this.criadoEm = criadoEm;
        this.atualizadoEm = atualizadoEm;
    }

    async criar() {
        return prisma.administrador.create({
            data: {
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                ativo: this.ativo
            }
        });
    }

    async atualizar() {
        return prisma.administrador.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                email: this.email,
                senha: this.senha,
                ativo: this.ativo,
                ultimoLogin: this.ultimoLogin
            }
        });
    }

    async deletar() {
        return prisma.administrador.delete({
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
                contains: filtros.email,
                mode: 'insensitive'
            };
        }

        if (filtros.ativo !== undefined) {
            where.ativo = filtros.ativo;
        }

        return prisma.administrador.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.administrador.findUnique({
            where: { id }
        });

        if (!data) {
            return null;
        }

        return new AdministradorModel(data);
    }

    static async buscarPorEmail(email) {
        const data = await prisma.administrador.findUnique({
            where: { email }
        });

        if (!data) {
            return null;
        }

        return new AdministradorModel(data);
    }
}
