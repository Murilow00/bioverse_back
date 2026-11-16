import express from 'express';
import * as controller from "../controllers/SimuladoController.js";

const router = express.Router();

router.post('/', controller.listarTodos);
router.get('/:id', controller.listarUm);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
