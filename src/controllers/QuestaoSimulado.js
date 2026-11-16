import QuestaoSimuladoModel from '../models/QuestaoSimuladoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            simuladoId,
            enunciado,
            imagem,
            alternativas,
            respostaCorreta,
            explicacao,
            ordem
        } = req.body;

        if (simuladoId === undefined || !enunciado ||
            !Array.isArray(alternativas) || respostaCorreta === undefined) {
            return res.status(400).json({
                error: 'Preencha simuladoId, enunciado, alternativas e respostaCorreta.'
            });
        }

        if (alternativas.length === 0 || !Number.isInteger(respostaCorreta) ||
            respostaCorreta < 0 || respostaCorreta >= alternativas.length) {
            return res.status(400).json({
                error: 'respostaCorreta deve indicar uma alternativa existente.'
            });
        }

        const questao = new QuestaoSimuladoModel({
            simuladoId,
            enunciado,
            imagem,
            alternativas,
            respostaCorreta,
            explicacao,
            ordem
        });
        const data = await questao.criar();

        return res.status(201).json({
            message: 'Questão do simulado criada com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao criar questão do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao criar questão do simulado.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const filtros = {};

        if (req.query.simuladoId !== undefined) {
            filtros.simuladoId = Number(req.query.simuladoId);
            if (!Number.isInteger(filtros.simuladoId) || filtros.simuladoId <= 0) {
                return res.status(400).json({
                    error: 'simuladoId deve ser um número inteiro positivo.'
                });
            }
        }

        if (req.query.enunciado) {
            filtros.enunciado = req.query.enunciado;
        }

        const questoes = await QuestaoSimuladoModel.buscarTodos(filtros);
        return res.status(200).json({
            total: questoes.length,
            questoes
        });
    } catch (error) {
        console.error('Erro ao buscar questões do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao buscar questões do simulado.'
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const questao = await QuestaoSimuladoModel.buscarPorId(id);
        if (!questao) {
            return res.status(404).json({
                error: 'Questão do simulado não encontrada.'
            });
        }

        return res.status(200).json({ data: questao });
    } catch (error) {
        console.error('Erro ao buscar questão do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao buscar questão do simulado.'
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

        const questao = await QuestaoSimuladoModel.buscarPorId(id);
        if (!questao) {
            return res.status(404).json({
                error: 'Questão do simulado não encontrada.'
            });
        }

        if (req.body.simuladoId !== undefined) {
            questao.simuladoId = req.body.simuladoId;
        }
        if (req.body.enunciado !== undefined) {
            questao.enunciado = req.body.enunciado;
        }
        if (req.body.imagem !== undefined) {
            questao.imagem = req.body.imagem;
        }
        if (req.body.alternativas !== undefined) {
            questao.alternativas = req.body.alternativas;
        }
        if (req.body.respostaCorreta !== undefined) {
            questao.respostaCorreta = req.body.respostaCorreta;
        }
        if (req.body.explicacao !== undefined) {
            questao.explicacao = req.body.explicacao;
        }
        if (req.body.ordem !== undefined) {
            questao.ordem = req.body.ordem;
        }

        if (!Array.isArray(questao.alternativas) ||
            !Number.isInteger(questao.respostaCorreta) ||
            questao.respostaCorreta < 0 ||
            questao.respostaCorreta >= questao.alternativas.length) {
            return res.status(400).json({
                error: 'respostaCorreta deve indicar uma alternativa existente.'
            });
        }

        const data = await questao.atualizar();
        return res.status(200).json({
            message: 'Questão do simulado atualizada com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao atualizar questão do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar questão do simulado.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const questao = await QuestaoSimuladoModel.buscarPorId(id);
        if (!questao) {
            return res.status(404).json({
                error: 'Questão do simulado não encontrada.'
            });
        }

        await questao.deletar();
        return res.status(200).json({
            message: 'Questão do simulado deletada com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao deletar questão do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao deletar questão do simulado.'
        });
    }
};
