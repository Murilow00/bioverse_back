
import express from 'express';
import * as controller from '../controllers/AdministradorController.js';

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.buscarTodos);
router.get('/:id', controller.buscarPorId);
router.get('/email/:email', controller.buscarPorEmail);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
