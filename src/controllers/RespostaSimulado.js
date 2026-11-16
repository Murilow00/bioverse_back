import RespostaSimuladoModel from '../models/RespostaSimuladoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            nome_aluno,
            simuladoId,
            acertos,
            total_questoes,
            percentual,
            tempo_gasto,
            realizado_em
        } = req.body;

        if (simuladoId === undefined || acertos === undefined ||
            total_questoes === undefined || percentual === undefined) {
            return res.status(400).json({
                error: 'Os campos "simuladoId", "acertos", "total_questoes" e "percentual" são obrigatórios.'
            });
        }

        const resposta = new RespostaSimuladoModel({
            nome_aluno,
            simuladoId,
            acertos,
            total_questoes,
            percentual,
            tempo_gasto,
            realizado_em: realizado_em ? new Date(realizado_em) : undefined
        });
        const data = await resposta.criar();

        return res.status(201).json({
            message: 'Resposta do simulado criada com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao criar resposta do simulado:', error);
        return res.status(500).json({
            error: 'Erro interno ao cadastrar resposta do simulado.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const filtros = { ...req.query };

        if (filtros.simuladoId !== undefined) {
            filtros.simuladoId = Number(filtros.simuladoId);
            if (!Number.isInteger(filtros.simuladoId)) {
                return res.status(400).json({
                    error: 'O ID do simulado deve ser um número válido.'
                });
            }
        }

        const registros = await RespostaSimuladoModel.buscarTodos(filtros);
        if (!registros || registros.length === 0) {
            return res.status(400).json({
                message: 'Nenhuma resposta de simulado encontrada.'
            });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar respostas de simulados:', error);
        return res.status(500).json({
            error: 'Erro ao buscar respostas de simulados.'
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({
                error: 'O ID enviado não é um número válido.'
            });
        }

        const resposta = await RespostaSimuladoModel.buscarPorId(parseInt(id));
        if (!resposta) {
            return res.status(404).json({
                error: 'Resposta do simulado não encontrada.'
            });
        }

        return res.status(200).json({ data: resposta });
    } catch (error) {
        console.error('Erro ao buscar resposta do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao buscar resposta do simulado.'
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const resposta = await RespostaSimuladoModel.buscarPorId(parseInt(id));
        if (!resposta) {
            return res.status(404).json({
                error: 'Resposta do simulado não encontrada para atualizar.'
            });
        }

        if (req.body.nome_aluno !== undefined) {
            resposta.nome_aluno = req.body.nome_aluno;
        }
        if (req.body.simuladoId !== undefined) {
            resposta.simuladoId = req.body.simuladoId;
        }
        if (req.body.acertos !== undefined) {
            resposta.acertos = req.body.acertos;
        }
        if (req.body.total_questoes !== undefined) {
            resposta.total_questoes = req.body.total_questoes;
        }
        if (req.body.percentual !== undefined) {
            resposta.percentual = req.body.percentual;
        }
        if (req.body.tempo_gasto !== undefined) {
            resposta.tempo_gasto = req.body.tempo_gasto;
        }
        if (req.body.realizado_em !== undefined) {
            resposta.realizado_em = new Date(req.body.realizado_em);
        }

        const data = await resposta.atualizar();
        return res.status(200).json({
            message: 'Resposta do simulado atualizada com sucesso!',
            data
        });
    } catch (error) {
        console.error('Erro ao atualizar resposta do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao atualizar resposta do simulado.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const resposta = await RespostaSimuladoModel.buscarPorId(parseInt(id));
        if (!resposta) {
            return res.status(404).json({
                error: 'Resposta do simulado não encontrada para deletar.'
            });
        }

        await resposta.deletar();
        return res.status(200).json({
            message: 'Resposta do simulado deletada com sucesso!',
            deletado: resposta
        });
    } catch (error) {
        console.error('Erro ao deletar resposta do simulado:', error);
        return res.status(500).json({
            error: 'Erro ao deletar resposta do simulado.'
        });
    }
};
