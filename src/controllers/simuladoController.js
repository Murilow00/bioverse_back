import SimuladoModel from "../Models/SimuladoModel.js";

export const listarTodos = async (req, res) => {
  try {
    const { dados: simulados, paginacao } = await SimuladoModel.buscarTodos(req.query);

    if (!simulados || simulados.length === 0) {
      return res.status(200).json({
        total: 0,
        mensagem: "Nenhum simulado encontrado.",
        simulados: [],
        paginacao,
      });
    }

    res.status(200).json({
      total: simulados.length,
      mensagem: "Lista de simulados",
      simulados,
      paginacao,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno ao obter simulados.",
      detalhes: error.message,
    });
  }
};

export const listarUm = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const simulado = await SimuladoModel.buscarPorId(id);

    if (!simulado) {
      return res.status(404).json({ erro: "Simulado não encontrado.", id });
    }

    res.status(200).json({ mensagem: "Simulado encontrado", simulado });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno ao obter simulado.",
      detalhes: error.message,
    });
  }
};

export const criar = async (req, res) => {
  try {
    const novoSimulado = new SimuladoModel(req.body);
    const simuladoCriado = await novoSimulado.criar();

    res.status(201).json({
      mensagem: "Simulado criado com sucesso!",
      simulado: simuladoCriado,
    });
  } catch (error) {
    // Retorna 400 se o erro vier da validação de limites/campos
    const isErroValidacao =
      error.message.includes("obrigatório") ||
      error.message.includes("não pode") ||
      error.message.includes("deve estar") ||
      error.message.includes("máximo") ||
      error.message.includes("deve ter");

    res.status(isErroValidacao ? 400 : 500).json({
      erro: isErroValidacao ? "Dados inválidos." : "Erro interno ao criar simulado.",
      detalhes: error.message,
    });
  }
};

export const atualizar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const existente = await SimuladoModel.buscarPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: "Simulado não encontrado.", id });
    }

    const simuladoModel = new SimuladoModel({ ...existente, ...req.body, id });
    const simuladoAtualizado = await simuladoModel.atualizar();

    res.status(200).json({
      mensagem: "Simulado atualizado com sucesso!",
      simulado: simuladoAtualizado,
    });
  } catch (error) {
    const isErroValidacao =
      error.message.includes("obrigatório") ||
      error.message.includes("não pode") ||
      error.message.includes("deve estar") ||
      error.message.includes("máximo") ||
      error.message.includes("deve ter");

    res.status(isErroValidacao ? 400 : 500).json({
      erro: isErroValidacao ? "Dados inválidos." : "Erro interno ao atualizar simulado.",
      detalhes: error.message,
    });
  }
};

export const deletar = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const existente = await SimuladoModel.buscarPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: "Simulado não encontrado.", id });
    }

    await existente.deletar();

    res.status(200).json({
      mensagem: "Simulado deletado com sucesso!",
      id,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno ao deletar simulado.",
      detalhes: error.message,
    });
  }
};