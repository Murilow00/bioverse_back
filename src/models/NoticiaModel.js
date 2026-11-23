import prisma from '../lib/prismaClient.js';

export default class NoticiaModel {
    constructor({
        id,
        titulo = null,
        resumo = null,
        conteudo_completo = null,
        img = null,
        data = null,
        atualizadaEm = null,
        categoria = null,
        publicada = false,
        destaque = false
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.resumo = resumo;
        this.conteudo_completo = conteudo_completo;
        this.img = img;
        this.data = data;
        this.atualizadaEm = atualizadaEm;
        this.categoria = categoria;
        this.publicada = publicada;
        this.destaque = destaque;
    }

    async criar() {
        return prisma.noticia.create({
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                conteudo_completo: this.conteudo_completo,
                img: this.img,
                categoria: this.categoria,
                publicada: this.publicada,
                destaque: this.destaque
            }
        });
    }

    async atualizar() {
        return prisma.noticia.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                conteudo_completo: this.conteudo_completo,
                img: this.img,
                categoria: this.categoria,
                publicada: this.publicada,
                destaque: this.destaque
            }
        });
    }

    async deletar() {
        return prisma.noticia.delete({
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

        if (filtros.publicada !== undefined) {
            where.publicada = filtros.publicada === true || filtros.publicada === 'true';
        }

        if (filtros.destaque !== undefined) {
            where.destaque = filtros.destaque === true || filtros.destaque === 'true';
        }

        return prisma.noticia.findMany({
            where,
            orderBy: { data: 'desc' }
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.noticia.findUnique({
            where: { id }
        });

        return data ? new NoticiaModel(data) : null;
    }
}
