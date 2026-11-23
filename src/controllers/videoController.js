import VideoModel from '../models/VideoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            titulo,
            descricao,
            url,
            plataforma,
            thumbnail,
            disciplina,
            duracao,
            ordem,
            publicado
        } = req.body;

        if (!titulo || !url) {
            return res.status(400).json({
                error: 'Os campos "titulo" e "url" são obrigatórios.'
            });
        }

        if (ordem !== undefined && !Number.isInteger(ordem)) {
            return res.status(400).json({
                error: 'O campo "ordem" deve ser um número inteiro.'
            });
        }

        if (publicado !== undefined && typeof publicado !== 'boolean') {
            return res.status(400).json({
                error: 'O campo "publicado" deve ser booleano.'
            });
        }

        const video = new VideoModel({
            titulo,
            descricao,
            url,
            plataforma,
            thumbnail,
            disciplina,
            duracao,
            ordem,
            publicado
        });
        const data = await video.criar();

        return res.status(201).json({
            message: 'Vídeo criado com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao criar vídeo:', error);
        return res.status(500).json({
            error: 'Erro ao criar vídeo.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const filtros = { ...req.query };

        if (filtros.publicado !== undefined) {
            if (filtros.publicado !== 'true' && filtros.publicado !== 'false') {
                return res.status(400).json({
                    error: 'O parâmetro "publicado" deve ser true ou false.'
                });
            }
            filtros.publicado = filtros.publicado === 'true';
        }

        const videos = await VideoModel.buscarTodos(filtros);
        return res.status(200).json({
            total: videos.length,
            videos
        });
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        return res.status(500).json({
            error: 'Erro ao buscar vídeos.'
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const video = await VideoModel.buscarPorId(id);
        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        return res.status(200).json({ data: video });
    } catch (error) {
        console.error('Erro ao buscar vídeo:', error);
        return res.status(500).json({
            error: 'Erro ao buscar vídeo.'
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const video = await VideoModel.buscarPorId(id);
        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        if (req.body.ordem !== undefined && !Number.isInteger(req.body.ordem)) {
            return res.status(400).json({
                error: 'O campo "ordem" deve ser um número inteiro.'
            });
        }

        if (req.body.publicado !== undefined && typeof req.body.publicado !== 'boolean') {
            return res.status(400).json({
                error: 'O campo "publicado" deve ser booleano.'
            });
        }

        if (req.body.titulo !== undefined) {
            video.titulo = req.body.titulo;
        }
        if (req.body.descricao !== undefined) {
            video.descricao = req.body.descricao;
        }
        if (req.body.url !== undefined) {
            video.url = req.body.url;
        }
        if (req.body.plataforma !== undefined) {
            video.plataforma = req.body.plataforma;
        }
        if (req.body.thumbnail !== undefined) {
            video.thumbnail = req.body.thumbnail;
        }
        if (req.body.disciplina !== undefined) {
            video.disciplina = req.body.disciplina;
        }
        if (req.body.duracao !== undefined) {
            video.duracao = req.body.duracao;
        }
        if (req.body.ordem !== undefined) {
            video.ordem = req.body.ordem;
        }
        if (req.body.publicado !== undefined) {
            video.publicado = req.body.publicado;
        }

        if (!video.titulo || !video.url) {
            return res.status(400).json({
                error: 'Os campos "titulo" e "url" não podem ser vazios.'
            });
        }

        const data = await video.atualizar();
        return res.status(200).json({
            message: 'Vídeo atualizado com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao atualizar vídeo:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar vídeo.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const video = await VideoModel.buscarPorId(id);
        if (!video) {
            return res.status(404).json({ error: 'Vídeo não encontrado.' });
        }

        await video.deletar();
        return res.status(200).json({
            message: 'Vídeo deletado com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao deletar vídeo:', error);
        return res.status(500).json({
            error: 'Erro ao deletar vídeo.'
        });
    }
};
