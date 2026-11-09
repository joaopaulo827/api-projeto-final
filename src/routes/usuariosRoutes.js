import { Router } from 'express';
import { listar, buscarPorId } from '../controllers/usuariosController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);

export default router;