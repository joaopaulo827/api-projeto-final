import { livros } from '../data/livros.js';

export function listarLivros(req, res) {
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

export function criar(req, res) {
  const { titulo, isbn, status, genero ,ano } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
  }
  const novoId = livros.length > 0 ? livros[livros.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    titulo,
    status: status ?? 'disponivel',
    genero,
    ano
  };
  livros.push(novo);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const posicao = livros.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  const atualizado = { ...livros[posicao], ...dados, id };
  livros[posicao] = atualizado;
  res.json(atualizado);
}

export function excluir(req, res) {
  const id = Number(req.params.id);
  const posicao = livros.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  livros.splice(posicao, 1);
  res.status(204).send();
}