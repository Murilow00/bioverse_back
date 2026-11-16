import prisma from '../lib/prismaClient.js';

export default class VideoModel {
    constructor({
        id,
        titulo,
        descricao = null,
        url,
        plataforma = null,
        thumbnail = null,
        disciplina = null,
        duracao = null,
        ordem = 0,
        publicado = true,
        criada
    } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.url = url;
        this.plataforma = plataforma;
        this.thumbnail = thumbnail;
        this.disciplina = disciplina;
        this.duracao = duracao;
        this.ordem = ordem;
        this.publicado = publicado;
        this.criada = criada;
    }

    async criar() {
        return prisma.video.create({
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                url: this.url,
                plataforma: this.plataforma,
                thumbnail: this.thumbnail,
                disciplina: this.disciplina,
                duracao: this.duracao,
                ordem: this.ordem,
                publicado: this.publicado
            }
        });
    }

    async atualizar() {
        return prisma.video.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                descricao: this.descricao,
                url: this.url,
                plataforma: this.plataforma,
                thumbnail: this.thumbnail,
                disciplina: this.disciplina,
                duracao: this.duracao,
                ordem: this.ordem,
                publicado: this.publicado
            }
        });
    }

    async deletar() {
        return prisma.video.delete({
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
        if (filtros.plataforma) {
            where.plataforma = {
                contains: filtros.plataforma,
                mode: 'insensitive'
            };
        }
        if (filtros.disciplina) {
            where.disciplina = {
                contains: filtros.disciplina,
                mode: 'insensitive'
            };
        }
        if (filtros.publicado !== undefined) {
            where.publicado = filtros.publicado;
        }

        return prisma.video.findMany({
            where,
            orderBy: [{ ordem: 'asc' }, { criada: 'desc' }]
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.video.findUnique({
            where: { id }
        });

        return data ? new VideoModel(data) : null;
    }
}
