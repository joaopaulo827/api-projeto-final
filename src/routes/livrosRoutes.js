import { Router } from 'express';
import { listar, buscarPorId } from '../controllers/livrosController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);

export default router;