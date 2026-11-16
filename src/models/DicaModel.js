
import prisma from '../lib/prismaClient.js';

export default class DicaModel {
    constructor({
        id,
        titulo = null,
        descricao = null,
        conteudo = null,
        categoria = null,
        img = null,
        urlFonte = null,
        destaque = false,
        criada = null,
        atualizada = null
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.conteudo = conteudo;
        this.categoria = categoria;
        this.img = img;
        this.urlFonte = urlFonte;
        this.destaque = destaque;
        this.criada = criada;
        this.atualizada = atualizada;
    }

    async criar() {
        return prisma.dica.create({
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                conteudo: this.conteudo,
                categoria: this.categoria,
                img: this.img,
                urlFonte: this.urlFonte,
                destaque: this.destaque
            }
        });
    }

    async atualizar() {
        return prisma.dica.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                conteudo: this.conteudo,
                categoria: this.categoria,
                img: this.img,
                urlFonte: this.urlFonte,
                destaque: this.destaque
            }
        });
    }

    async deletar() {
        return prisma.dica.delete({
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

        if (filtros.categoria) {
            where.categoria = {
                contains: filtros.categoria,
                mode: 'insensitive'
            };
        }

        if (filtros.destaque !== undefined) {
            where.destaque = filtros.destaque === 'true' ||
                filtros.destaque === true;
        }

        return prisma.dica.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.dica.findUnique({
            where: { id }
        });

        if (!data) {
            return null;
        }

        return new DicaModel(data);
    }
}
