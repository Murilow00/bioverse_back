import SobreNosModel from '../models/SobreNosModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nomeProjeto, objetivo, descricao, membros, contatos } = req.body;

        if (!nomeProjeto){
            return res.status(400).json({ error: 'O campo "nomeProjeto" é obrigatório!' });
        }

        const sobre_nos = new SobreNosModel({ nomeProjeto, objetivo, descricao, membros, contatos });
        const data = await sobre_nos.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await SobreNosModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const sobre_nos = await SobreNosModel.buscarPorId(parseInt(id));

        if (!sobre_nos) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: sobre_nos });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const sobre_nos = await SobreNosModel.buscarPorId(parseInt(id));

        if (!sobre_nos) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nomeProjeto !== undefined) {
            sobre_nos.nomeProjeto = req.body.nomeProjeto;
        }
        const data = await sobre_nos.atualizar();

        return res.status(200).json({ message: `O registro "${data.nomeProjeto}" foi atualizado com sucesso!`, data});
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const sobre_nos = await SobreNosModel.buscarPorId(parseInt(id));

        if (!sobre_nos) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await sobre_nos.deletar();

        return res.status(200).json({ message: `O registro "${sobre_nos.nomeProjeto}" foi deletado com sucesso!`, deletado: sobre_nos });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};