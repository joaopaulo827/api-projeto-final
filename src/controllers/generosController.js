import { generos } from '../data/generos.js';

export function listarGenero(req, res) {
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

export function criar(req, res) {
  const { id, nome } = req.body ?? {};
  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório' });
  }
  const novoId = generos.length > 0 ? generos[generos.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    nome
  };
  generos.push(novo);
  res.status(201).json(novo);
}