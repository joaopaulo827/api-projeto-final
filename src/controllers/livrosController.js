import { livros } from '../data/livros.js';

export function listar(req, res) {
  res.json(livros);
}

export function buscarPorId(req, res) {
  const id = Number(req.params.id);

  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    return res.status(404).json({
      erro: 'Livro não encontrado'
    });
  }

  res.json(livro);
};