import { generos } from '../data/generos.js';

export function listar(req, res) {
  res.json(generos);
};

export function buscarPorId(req, res) {
  const id = Number(req.params.id);

  const genero = generos.find((l) => l.id === id);

  if (!genero) {
    return res.status(404).json({
      erro: 'Genero não encontrado'
    });
  }

  res.json(genero);
};