import bcrypt from 'bcryptjs';
import UsuarioModel from '../models/UsuarioModel.js';

const serializarUsuario = ({ id, nome, email, ativo, criadoEm, atualizadoEm }) => ({
    id,
    nome,
    email,
    ativo,
    criadoEm,
    atualizadoEm
});

const responderErro = (res, error, mensagem) => {
    console.error(mensagem, error);

    if (error?.code === 'P2002') {
        return res.status(409).json({
            error: 'Já existe um usuário cadastrado com este email.'
        });
    }

    return res.status(500).json({ error: mensagem });
};

const obterIdValido = (id) => {
    const numero = Number(id);
    return Number.isSafeInteger(numero) && numero > 0 ? numero : null;
};

export const criar = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const { nome, email, senha, ativo } = req.body;

        if (typeof nome !== 'string' || !nome.trim()) {
            return res.status(400).json({
                error: 'O campo "nome" é obrigatório!'
            });
        }

        if (typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({
                error: 'O campo "email" é obrigatório!'
            });
        }

        if (typeof senha !== 'string' || !senha) {
            return res.status(400).json({
                error: 'O campo "senha" é obrigatório!'
            });
        }

        if (ativo !== undefined && typeof ativo !== 'boolean') {
            return res.status(400).json({
                error: 'O campo "ativo" deve ser booleano.'
            });
        }

        const usuario = new UsuarioModel({
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            senha: await bcrypt.hash(senha, 10),
            ativo
        });

        const data = await usuario.criar();

        return res.status(201).json({
            message: 'Usuário criado com sucesso!',
            data: serializarUsuario(data)
        });
    } catch (error) {
        return responderErro(res, error, 'Erro interno ao cadastrar usuário.');
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.buscarTodos(req.query);

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({
                message: 'Nenhum usuário encontrado.'
            });
        }

        return res.status(200).json(usuarios.map(serializarUsuario));
    } catch (error) {
        return responderErro(res, error, 'Erro ao buscar usuários.');
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const id = obterIdValido(req.params.id);

        if (id === null) {
            return res.status(400).json({
                error: 'O ID enviado não é um número válido.'
            });
        }

        const usuario = await UsuarioModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json({
            data: serializarUsuario(usuario)
        });
    } catch (error) {
        return responderErro(res, error, 'Erro ao buscar usuário.');
    }
};

export const buscarPorEmail = async (req, res) => {
    try {
        const email = req.params.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({
                error: 'O email é obrigatório.'
            });
        }

        const usuario = await UsuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json({
            data: serializarUsuario(usuario)
        });
    } catch (error) {
        return responderErro(res, error, 'Erro ao buscar usuário por email.');
    }
};

export const atualizar = async (req, res) => {
    try {
        const id = obterIdValido(req.params.id);

        if (id === null) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados!'
            });
        }

        const usuario = await UsuarioModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuário não encontrado para atualizar.'
            });
        }

        if (req.body.nome !== undefined) {
            if (typeof req.body.nome !== 'string' || !req.body.nome.trim()) {
                return res.status(400).json({
                    error: 'O campo "nome" deve ser uma string não vazia.'
                });
            }
            usuario.nome = req.body.nome.trim();
        }

        if (req.body.email !== undefined) {
            if (typeof req.body.email !== 'string' || !req.body.email.trim()) {
                return res.status(400).json({
                    error: 'O campo "email" deve ser uma string não vazia.'
                });
            }
            usuario.email = req.body.email.trim().toLowerCase();
        }

        if (req.body.senha !== undefined) {
            if (typeof req.body.senha !== 'string' || !req.body.senha) {
                return res.status(400).json({
                    error: 'O campo "senha" deve ser uma string não vazia.'
                });
            }
            usuario.senha = await bcrypt.hash(req.body.senha, 10);
        }

        if (req.body.ativo !== undefined) {
            if (typeof req.body.ativo !== 'boolean') {
                return res.status(400).json({
                    error: 'O campo "ativo" deve ser booleano.'
                });
            }
            usuario.ativo = req.body.ativo;
        }

        const data = await usuario.atualizar();

        return res.status(200).json({
            message: `O usuário "${data.nome}" foi atualizado com sucesso!`,
            data: serializarUsuario(data)
        });
    } catch (error) {
        return responderErro(res, error, 'Erro ao atualizar usuário.');
    }
};

export const deletar = async (req, res) => {
    try {
        const id = obterIdValido(req.params.id);

        if (id === null) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const usuario = await UsuarioModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuário não encontrado para deletar.'
            });
        }

        const deletado = serializarUsuario(usuario);
        await usuario.deletar();

        return res.status(200).json({
            message: `O usuário "${usuario.nome}" foi deletado com sucesso!`,
            deletado
        });
    } catch (error) {
        return responderErro(res, error, 'Erro ao deletar usuário.');
    }
};