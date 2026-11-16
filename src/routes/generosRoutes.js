import { Router } from 'express';
import { listarGenero, buscarPorId, criar } from '../controllers/generosController.js';

const router = Router();

router.get('/', listarGenero);
router.get('/:id', buscarPorId);
router.post('/', criar);
export default router;