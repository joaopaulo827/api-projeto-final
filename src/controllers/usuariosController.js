import { usuarios } from '../data/usuarios.js';

export function listarUsuarios(req, res) {
  res.json(usuarios);
};

export function buscarPorId(req, res) {
  const id = Number(req.params.id);

  const usuario = usuarios.find((l) => l.id === id);

  if (!usuario) {
    return res.status(404).json({
      erro: 'Usuario não encontrado'
    });
  }

  res.json(usuario);
};

export function criar(req, res) {
  const { nome, email, senhaHash,criadoEm } = req.body ?? {};
  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório' });
  }
  const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    titulo,
    status: status ?? 'disponivel',
  };
  usuarios.push(novo);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const posicao = usuarios.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  const atualizado = { ...usuarios[posicao], ...dados, id };
  usuarios[posicao] = atualizado;
  res.json(atualizado);
}