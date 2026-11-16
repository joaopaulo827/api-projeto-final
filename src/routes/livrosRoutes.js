import { Router } from 'express';
import { listarLivros, buscarPorId, criar, atualizar, excluir } from '../controllers/livrosController.js';

const router = Router();

router.get('/', listarLivros);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar)
router.delete('/:id', excluir);
export default router;