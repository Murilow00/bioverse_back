import express from 'express';
import * as controller from "../controllers/simuladoController.js";

const router = express.Router();

router.get('/', controller.listarTodos);
router.get('/:id', controller.listarUm);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
