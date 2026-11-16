
import prisma from '../lib/prismaClient.js';

export default class EstagioModel {
    constructor({
        id,
        titulo = null,
        empresa = null,
        descricao = null,
        requisitos = null,
        cursos = [],
        modalidade = null,
        bolsa_auxilio = null,
        carga_horaria = null,
        ativo = true,
        criada = null,
        atualizada = null
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.empresa = empresa;
        this.descricao = descricao;
        this.requisitos = requisitos;
        this.cursos = cursos;
        this.modalidade = modalidade;
        this.bolsa_auxilio = bolsa_auxilio;
        this.carga_horaria = carga_horaria;
        this.ativo = ativo;
        this.criada = criada;
        this.atualizada = atualizada;
    }

    async criar() {
        return prisma.estagio.create({
            data: {
                titulo: this.titulo,
                empresa: this.empresa,
                descricao: this.descricao,
                requisitos: this.requisitos,
                cursos: this.cursos,
                modalidade: this.modalidade,
                bolsa_auxilio: this.bolsa_auxilio,
                carga_horaria: this.carga_horaria,
                ativo: this.ativo
            }
        });
    }

    async atualizar() {
        return prisma.estagio.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                empresa: this.empresa,
                descricao: this.descricao,
                requisitos: this.requisitos,
                cursos: this.cursos,
                modalidade: this.modalidade,
                bolsa_auxilio: this.bolsa_auxilio,
                carga_horaria: this.carga_horaria,
                ativo: this.ativo
            }
        });
    }

    async deletar() {
        return prisma.estagio.delete({
            where: { id: this.id }
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = {
                contains: filtros.titulo,
                mode: 'insensitive'
            };
        }

        if (filtros.empresa) {
            where.empresa = {
                contains: filtros.empresa,
                mode: 'insensitive'
            };
        }

        if (filtros.modalidade) {
            where.modalidade = {
                contains: filtros.modalidade,
                mode: 'insensitive'
            };
        }

        if (filtros.ativo !== undefined) {
            where.ativo = filtros.ativo === 'true' ||
                filtros.ativo === true;
        }

        return prisma.estagio.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.estagio.findUnique({
            where: { id }
        });

        if (!data) {
            return null;
        }

        return new EstagioModel(data);
    }
}
