import NoticiaModel from '../models/NoticiaModel.js';

const camposTexto = ['resumo', 'conteudo_completo', 'img', 'categoria', 'fonte'];
const camposBooleanos = ['publicada', 'destaque'];

const validarCampos = (dados) => {
    for (const campo of camposTexto) {
        if (dados[campo] !== undefined && dados[campo] !== null && typeof dados[campo] !== 'string') {
            return `O campo "${campo}" deve ser texto.`;
        }
    }

    for (const campo of camposBooleanos) {
        if (dados[campo] !== undefined && typeof dados[campo] !== 'boolean') {
            return `O campo "${campo}" deve ser booleano.`;
        }
    }

    return null;
};

const validarId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { titulo, resumo, conteudo_completo, img, categoria, fonte, publicada, destaque } = req.body;

        if (typeof titulo !== 'string' || !titulo.trim()) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório.' });
        }

        const erroValidacao = validarCampos(req.body);
        if (erroValidacao) {
            return res.status(400).json({ error: erroValidacao });
        }

        const noticia = new NoticiaModel({
            titulo,
            resumo,
            conteudo_completo,
            img,
            categoria,
            fonte,
            publicada,
            destaque
        });
        const data = await noticia.criar();

        return res.status(201).json({ message: 'Notícia criada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar notícia:', error);
        return res.status(500).json({ error: 'Erro ao criar notícia.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const filtros = { ...req.query };

        for (const campo of camposBooleanos) {
            if (filtros[campo] !== undefined) {
                if (filtros[campo] !== 'true' && filtros[campo] !== 'false') {
                    return res.status(400).json({
                        error: `O parâmetro "${campo}" deve ser true ou false.`
                    });
                }
                filtros[campo] = filtros[campo] === 'true';
            }
        }

        const noticias = await NoticiaModel.buscarTodos(filtros);
        return res.status(200).json({ total: noticias.length, noticias });
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        return res.status(500).json({ error: 'Erro ao buscar notícias.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validarId(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const noticia = await NoticiaModel.buscarPorId(Number(id));
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada.' });
        }

        return res.status(200).json({ data: noticia });
    } catch (error) {
        console.error('Erro ao buscar notícia:', error);
        return res.status(500).json({ error: 'Erro ao buscar notícia.' });
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

        const noticia = await NoticiaModel.buscarPorId(Number(id));
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada.' });
        }

        const erroValidacao = validarCampos(req.body);
        if (erroValidacao) {
            return res.status(400).json({ error: erroValidacao });
        }

        if (req.body.titulo !== undefined) {
            if (typeof req.body.titulo !== 'string' || !req.body.titulo.trim()) {
                return res.status(400).json({ error: 'O campo "titulo" não pode ser vazio.' });
            }
            noticia.titulo = req.body.titulo;
        }

        for (const campo of [...camposTexto, ...camposBooleanos]) {
            if (req.body[campo] !== undefined) {
                noticia[campo] = req.body[campo];
            }
        }

        const data = await noticia.atualizar();
        return res.status(200).json({ message: 'Notícia atualizada com sucesso!', data });
    } catch (error) {
        console.error('Erro ao atualizar notícia:', error);
        return res.status(500).json({ error: 'Erro ao atualizar notícia.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;
        if (!validarId(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const noticia = await NoticiaModel.buscarPorId(Number(id));
        if (!noticia) {
            return res.status(404).json({ error: 'Notícia não encontrada.' });
        }

        await noticia.deletar();
        return res.status(200).json({ message: 'Notícia deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar notícia:', error);
        return res.status(500).json({ error: 'Erro ao deletar notícia.' });
    }
};
