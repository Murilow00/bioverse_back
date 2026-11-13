
import AdministradorModel from '../models/AdministradorModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, email, senha, ativo } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }

        if (!email) {
            return res.status(400).json({ error: 'O campo "email" é obrigatório!' });
        }

        if (!senha) {
            return res.status(400).json({ error: 'O campo "senha" é obrigatório!' });
        }

        const administrador = new AdministradorModel({
            nome,
            email,
            senha,
            ativo
        });

        const data = await administrador.criar();

        return res.status(201).json({
            message: 'Administrador criado com sucesso!',
            data
        });

    } catch (error) {
        console.error('Erro ao criar:', error);

        return res.status(500).json({
            error: 'Erro interno ao cadastrar administrador.'
        });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await AdministradorModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({
                message: 'Nenhum administrador encontrado.'
            });
        }

        return res.status(200).json(registros);

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar administradores.'
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

        const administrador = await AdministradorModel.buscarPorId(parseInt(id));

        if (!administrador) {
            return res.status(404).json({
                error: 'Administrador não encontrado.'
            });
        }

        return res.status(200).json({
            data: administrador
        });

    } catch (error) {
        console.error('Erro ao buscar:', error);

        return res.status(500).json({
            error: 'Erro ao buscar administrador.'
        });
    }
};

export const buscarPorEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({
                error: 'O email é obrigatório.'
            });
        }

        const administrador = await AdministradorModel.buscarPorEmail(email);

        if (!administrador) {
            return res.status(404).json({
                error: 'Administrador não encontrado.'
            });
        }

        return res.status(200).json({
            data: administrador
        });

    } catch (error) {
        console.error('Erro ao buscar por email:', error);

        return res.status(500).json({
            error: 'Erro ao buscar administrador.'
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        if (!req.body) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const administrador = await AdministradorModel.buscarPorId(parseInt(id));

        if (!administrador) {
            return res.status(404).json({
                error: 'Administrador não encontrado para atualizar.'
            });
        }

        if (req.body.nome !== undefined) {
            administrador.nome = req.body.nome;
        }

        if (req.body.email !== undefined) {
            administrador.email = req.body.email;
        }

        if (req.body.senha !== undefined) {
            administrador.senha = req.body.senha;
        }

        if (req.body.ativo !== undefined) {
            administrador.ativo = req.body.ativo;
        }

        if (req.body.ultimoLogin !== undefined) {
            administrador.ultimoLogin = req.body.ultimoLogin;
        }

        const data = await administrador.atualizar();

        return res.status(200).json({
            message: `O administrador "${data.nome}" foi atualizado com sucesso!`,
            data
        });

    } catch (error) {
        console.error('Erro ao atualizar:', error);

        return res.status(500).json({
            error: 'Erro ao atualizar administrador.'
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: 'ID inválido.'
            });
        }

        const administrador = await AdministradorModel.buscarPorId(parseInt(id));

        if (!administrador) {
            return res.status(404).json({
                error: 'Administrador não encontrado para deletar.'
            });
        }

        await administrador.deletar();

        return res.status(200).json({
            message: `O administrador "${administrador.nome}" foi deletado com sucesso!`,
            deletado: administrador
        });

    } catch (error) {
        console.error('Erro ao deletar:', error);

        return res.status(500).json({
            error: 'Erro ao deletar administrador.'
        });
    }
};
