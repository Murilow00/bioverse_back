
import MembroEquipeModel from '../models/MembroEquipeModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const {
            nome,
            funcao,
            bio,
            foto,
            ordem,
            ativo
        } = req.body;

        if (!nome) {
            return res.status(400).json({
                error: 'O campo "nome" é obrigatório!'
            });
        }

        const membro = new MembroEquipeModel({
            nome,
            funcao,
            bio,
            foto,
            ordem,
            ativo
        });

        const data = await membro.criar();

        return res.status(201).json({
            message: 'Membro da equipe cadastrado com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar:', error);

        return res.status(500).json({
            error: 'Erro interno ao cadastrar membro da equipe.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await MembroEquipeModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(404).json({
                message: 'Nenhum membro da equipe encontrado.'
            });
        }

        return res.status(200).json(registros);

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar membros da equipe.'
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

        const membro = await MembroEquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({
                error: 'Membro da equipe não encontrado.'
            });
        }

        return res.status(200).json({
            data: membro
        });

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar membro da equipe.'
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

        const membro = await MembroEquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({
                error: 'Membro da equipe não encontrado para atualizar.'
            });
        }

        if (req.body.nome !== undefined) {
            membro.nome = req.body.nome;
        }

        if (req.body.funcao !== undefined) {
            membro.funcao = req.body.funcao;
        }

        if (req.body.bio !== undefined) {
            membro.bio = req.body.bio;
        }

        if (req.body.foto !== undefined) {
            membro.foto = req.body.foto;
        }

        if (req.body.ordem !== undefined) {
            membro.ordem = req.body.ordem;
        }

        if (req.body.ativo !== undefined) {
            membro.ativo = req.body.ativo;
        }

        const data = await membro.atualizar();

        return res.status(200).json({
            message: `O membro "${data.nome}" foi atualizado com sucesso!`,
            data
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar membro da equipe.'
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

        const membro = await MembroEquipeModel.buscarPorId(parseInt(id));

        if (!membro) {
            return res.status(404).json({
                error: 'Membro da equipe não encontrado para deletar.'
            });
        }

        await membro.deletar();

        return res.status(200).json({
            message: `O membro "${membro.nome}" foi deletado com sucesso!`,
            deletado: membro
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);

        return res.status(500).json({
            error: 'Erro ao deletar membro da equipe.'
        });
    }
};
