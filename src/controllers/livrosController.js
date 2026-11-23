
import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';
import { validarLivro, lerId } from '../validacao/livroValidacao.js';

const incluir = { genero: true };

async function buscarOuFalhar(id) {
  const livro = await prisma.livro.findUnique({ where: { id }, include: incluir });
  if (!livro) {
    throw new ErroApi(404, 'Livro não encontrado');
  }
  return livro;
}

async function conferirGenero(generoId) {
  if (generoId === undefined) return;
  const genero = await prisma.genero.findUnique({ where: { id: generoId } });
  if (!genero) {
    throw new ErroApi(400, 'Dados inválidos', ['generoId não existe']);
  }
}


export async function listarLivros(req, res) {
  const livros = await prisma.livro.findMany({ include: incluir, orderBy: { id: 'asc' } });
  res.json(livros);
}

// GET /api/livros/:id
export async function buscarPorId(req, res) {
  const livro = await buscarOuFalhar(lerId(req.params.id));
  res.json(livro);
}

// POST /api/livros
export async function criar(req, res) {
  const dados = req.body ?? {};
  validarLivro(dados);
  await conferirGenero(dados.generoId);
  const novo = await prisma.livro.create({
    data: {
      titulo: dados.titulo,
      isbn: dados.isbn,
      ano: dados.ano,
      status: dados.status,
      generoId: dados.generoId,
    },
    include: incluir,
  });
  res.status(201).json(novo);
}

// PUT /api/livros/:id
export async function atualizar(req, res) {
  const id = lerId(req.params.id);
  await buscarOuFalhar(id);
  const dados = req.body ?? {};
  validarLivro(dados, true);
  await conferirGenero(dados.generoId);
  const atualizado = await prisma.livro.update({
    where: { id },
    data: {
      titulo: dados.titulo,
      isbn: dados.isbn,
      ano: dados.ano,
      status: dados.status,
      generoId: dados.generoId,
    },
    include: incluir,
  });
  res.json(atualizado);
}

export async function excluir(req, res) {
  const id = lerId(req.params.id);
  await buscarOuFalhar(id);
  await prisma.livro.delete({ where: { id } });
  res.status(204).send();
}

const STATUS_VALIDOS = ['disponivel', 'emprestado', 'indisponivel'];

export async function alterarStatus(req, res) {
  const id = lerId(req.params.id);
  await buscarOuFalhar(id);
  const { status } = req.body ?? {};
  if (!STATUS_VALIDOS.includes(status)) {
    throw new ErroApi(400, 'Dados inválidos', [`status precisa ser: ${STATUS_VALIDOS.join(', ')}`]);
  }
  const atualizado = await prisma.livro.update({ where: { id }, data: { status }, include: incluir });
  res.json(atualizado);
}