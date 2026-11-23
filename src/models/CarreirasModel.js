import prisma from '../lib/prismaClient.js';

export default class CarreirasModel {
    constructor({
        id,
        nome = null,
        descricao = null,
        cursos_relacionados = [],
        profissoes = [],
        habilidades = [],
        img = null,
        salario_medio = null,
        area = null,
        criada = null,
        atualizado = null
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.cursos_relacionados = cursos_relacionados;
        this.profissoes = profissoes;
        this.habilidades = habilidades;
        this.img = img;
        this.salario_medio = salario_medio;
        this.area = area;
        this.criada = criada;
        this.atualizado = atualizado;
    }

    async criar() {
        return prisma.carreiras.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                cursos_relacionados: this.cursos_relacionados,
                profissoes: this.profissoes,
                habilidades: this.habilidades,
                img: this.img,
                salario_medio: this.salario_medio,
                area: this.area
            }
        });
    }

    async atualizar() {
        return prisma.carreiras.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                descricao: this.descricao,
                cursos_relacionados: this.cursos_relacionados,
                profissoes: this.profissoes,
                habilidades: this.habilidades,
                img: this.img,
                salario_medio: this.salario_medio,
                area: this.area
            }
        });
    }

    async deletar() {
        return prisma.carreiras.delete({
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

        if (filtros.area) {
            where.area = {
                contains: filtros.area,
                mode: 'insensitive'
            };
        }

        if (filtros.curso) {
            where.cursos_relacionados = { has: filtros.curso };
        }

        if (filtros.profissao) {
            where.profissoes = { has: filtros.profissao };
        }

        return prisma.carreiras.findMany({
            where,
            orderBy: { nome: 'asc' }
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.carreiras.findUnique({
            where: { id }
        });

        return data ? new CarreirasModel(data) : null;
    }
}
