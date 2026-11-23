import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';


export async function listar(req, res) {
  const generos = await prisma.genero.findMany({ orderBy: { nome: 'asc' } });
  res.json(generos);
}


export async function criar(req, res) {
  const { nome } = req.body ?? {};
  if (typeof nome !== 'string' || nome.trim() === '') {
    throw new ErroApi(400, 'Dados inválidos', ['nome é obrigatório e precisa ser um texto']);
  }

  const nova = await prisma.genero.create({ data: { nome: nome.trim() } });
  res.status(201).json(nova);
}