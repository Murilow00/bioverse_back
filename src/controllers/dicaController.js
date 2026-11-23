
import DicaModel from '../models/DicaModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            titulo,
            descricao,
            conteudo,
            categoria,
            img,
            urlFonte,
            destaque
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!'
            });
        }

        const dica = new DicaModel({
            titulo,
            descricao,
            conteudo,
            categoria,
            img,
            urlFonte,
            destaque
        });

        const data = await dica.criar();

        return res.status(201).json({
            message: 'Dica criada com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar:', error);

        return res.status(500).json({
            error: 'Erro interno ao cadastrar dica.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await DicaModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(404).json({
                message: 'Nenhuma dica encontrada.'
            });
        }

        return res.status(200).json(registros);

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar dicas.'
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({
                error: 'O ID enviado não é um número válido.'
            });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({
                error: 'Dica não encontrada.'
            });
        }

        return res.status(200).json({
            data: dica
        });

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar dica.'
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({
                error: 'Dica não encontrada para atualizar.'
            });
        }

        if (req.body.titulo !== undefined) {
            dica.titulo = req.body.titulo;
        }

        if (req.body.descricao !== undefined) {
            dica.descricao = req.body.descricao;
        }

        if (req.body.conteudo !== undefined) {
            dica.conteudo = req.body.conteudo;
        }

        if (req.body.categoria !== undefined) {
            dica.categoria = req.body.categoria;
        }

        if (req.body.img !== undefined) {
            dica.img = req.body.img;
        }

        if (req.body.urlFonte !== undefined) {
            dica.urlFonte = req.body.urlFonte;
        }

        if (req.body.destaque !== undefined) {
            dica.destaque = req.body.destaque;
        }

        const data = await dica.atualizar();

        return res.status(200).json({
            message: `A dica "${data.titulo}" foi atualizada com sucesso!`,
            data
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar dica.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id) || !Number.isInteger(Number(id))) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        const dica = await DicaModel.buscarPorId(parseInt(id));

        if (!dica) {
            return res.status(404).json({
                error: 'Dica não encontrada para deletar.'
            });
        }

        await dica.deletar();

        return res.status(200).json({
            message: `A dica "${dica.titulo}" foi deletada com sucesso!`,
            deletado: dica
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);

        return res.status(500).json({
            error: 'Erro ao deletar dica.'
        });
    }
};
