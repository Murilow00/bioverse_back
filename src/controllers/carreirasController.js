import CarreirasModel from '../models/CarreirasModel.js';

const camposTexto = ['descricao', 'img', 'salario_medio', 'area'];
const camposLista = ['cursos_relacionados', 'profissoes', 'habilidades'];
const validarId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

const validarCampos = (dados) => {
    for (const campo of camposTexto) {
        if (dados[campo] !== undefined && dados[campo] !== null && typeof dados[campo] !== 'string') {
            return `O campo "${campo}" deve ser texto.`;
        }
    }

    for (const campo of camposLista) {
        if (dados[campo] !== undefined &&
            (!Array.isArray(dados[campo]) || dados[campo].some((item) => typeof item !== 'string'))) {
            return `O campo "${campo}" deve ser uma lista de textos.`;
        }
    }

    return null;
};

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            nome,
            descricao,
            cursos_relacionados,
            profissoes,
            habilidades,
            img,
            salario_medio,
            area
        } = req.body;

        if (typeof nome !== 'string' || !nome.trim()) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório.' });
        }

        const erroValidacao = validarCampos(req.body);
        if (erroValidacao) {
            return res.status(400).json({ error: erroValidacao });
        }

        const carreira = new CarreirasModel({
            nome,
            descricao,
            cursos_relacionados,
            profissoes,
            habilidades,
            img,
            salario_medio,
            area
        });
        const data = await carreira.criar();

        return res.status(201).json({ message: 'Carreira criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar carreira:', error);
        return res.status(500).json({ error: 'Erro ao criar carreira.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const carreiras = await CarreirasModel.buscarTodos(req.query);
        return res.status(200).json({ total: carreiras.length, carreiras });
    } catch (error) {
        console.error('Erro ao buscar carreiras:', error);
        return res.status(500).json({ error: 'Erro ao buscar carreiras.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validarId(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const carreira = await CarreirasModel.buscarPorId(Number(id));
        if (!carreira) {
            return res.status(404).json({ error: 'Carreira não encontrada.' });
        }

        return res.status(200).json({ data: carreira });
    } catch (error) {
        console.error('Erro ao buscar carreira:', error);
        return res.status(500).json({ error: 'Erro ao buscar carreira.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validarId(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const carreira = await CarreirasModel.buscarPorId(Number(id));
        if (!carreira) {
            return res.status(404).json({ error: 'Carreira não encontrada.' });
        }

        const erroValidacao = validarCampos(req.body);
        if (erroValidacao) {
            return res.status(400).json({ error: erroValidacao });
        }

        if (req.body.nome !== undefined) {
            if (typeof req.body.nome !== 'string' || !req.body.nome.trim()) {
                return res.status(400).json({ error: 'O campo "nome" não pode ser vazio.' });
            }
            carreira.nome = req.body.nome;
        }

        for (const campo of [...camposTexto, ...camposLista]) {
            if (req.body[campo] !== undefined) {
                carreira[campo] = req.body[campo];
            }
        }

        const data = await carreira.atualizar();
        return res.status(200).json({ message: 'Carreira atualizada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao atualizar carreira:', error);
        return res.status(500).json({ error: 'Erro ao atualizar carreira.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validarId(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const carreira = await CarreirasModel.buscarPorId(Number(id));
        if (!carreira) {
            return res.status(404).json({ error: 'Carreira não encontrada.' });
        }

        await carreira.deletar();
        return res.status(200).json({ message: 'Carreira deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar carreira:', error);
        return res.status(500).json({ error: 'Erro ao deletar carreira.' });
    }
};
