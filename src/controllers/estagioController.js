
import EstagioModel from '../models/EstagioModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            titulo,
            empresa,
            descricao,
            requisitos,
            cursos,
            modalidade,
            bolsa_auxilio,
            carga_horaria,
            ativo
        } = req.body;

        if (!titulo) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!'
            });
        }

        if (cursos !== undefined && !Array.isArray(cursos)) {
            return res.status(400).json({
                error: 'O campo "cursos" deve ser uma lista!'
            });
        }

        const estagio = new EstagioModel({
            titulo,
            empresa,
            descricao,
            requisitos,
            cursos,
            modalidade,
            bolsa_auxilio,
            carga_horaria,
            ativo
        });

        const data = await estagio.criar();

        return res.status(201).json({
            message: 'Estágio cadastrado com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar:', error);

        return res.status(500).json({
            error: 'Erro interno ao cadastrar estágio.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await EstagioModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(404).json({
                message: 'Nenhum estágio encontrado.'
            });
        }

        return res.status(200).json(registros);

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar estágios.'
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

        const estagio = await EstagioModel.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({
                error: 'Estágio não encontrado.'
            });
        }

        return res.status(200).json({
            data: estagio
        });

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar estágio.'
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

        const estagio = await EstagioModel.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({
                error: 'Estágio não encontrado para atualizar.'
            });
        }

        if (req.body.titulo !== undefined) {
            estagio.titulo = req.body.titulo;
        }

        if (req.body.empresa !== undefined) {
            estagio.empresa = req.body.empresa;
        }

        if (req.body.descricao !== undefined) {
            estagio.descricao = req.body.descricao;
        }

        if (req.body.requisitos !== undefined) {
            estagio.requisitos = req.body.requisitos;
        }

        if (req.body.cursos !== undefined) {
            if (!Array.isArray(req.body.cursos)) {
                return res.status(400).json({
                    error: 'O campo "cursos" deve ser uma lista!'
                });
            }

            estagio.cursos = req.body.cursos;
        }

        if (req.body.modalidade !== undefined) {
            estagio.modalidade = req.body.modalidade;
        }

        if (req.body.bolsa_auxilio !== undefined) {
            estagio.bolsa_auxilio = req.body.bolsa_auxilio;
        }

        if (req.body.carga_horaria !== undefined) {
            estagio.carga_horaria = req.body.carga_horaria;
        }

        if (req.body.ativo !== undefined) {
            estagio.ativo = req.body.ativo;
        }

        const data = await estagio.atualizar();

        return res.status(200).json({
            message: `O estágio "${data.titulo}" foi atualizado com sucesso!`,
            data
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar estágio.'
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

        const estagio = await EstagioModel.buscarPorId(parseInt(id));

        if (!estagio) {
            return res.status(404).json({
                error: 'Estágio não encontrado para deletar.'
            });
        }

        await estagio.deletar();

        return res.status(200).json({
            message: `O estágio "${estagio.titulo}" foi deletado com sucesso!`,
            deletado: estagio
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);

        return res.status(500).json({
            error: 'Erro ao deletar estágio.'
        });
    }
};
