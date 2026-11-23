import { ErroApi } from '../erros.js';

const STATUS_VALIDOS = ['disponivel', 'emprestado', 'indisponivel'];

export function validarLivro(dados, parcial = false) {
  const erros = [];
  if (!parcial || dados.titulo !== undefined) {
    if (typeof dados.titulo !== 'string' || dados.titulo.trim() === '') erros.push('titulo é obrigatório e precisa ser um texto');
  }
  if (dados.isbn !== undefined && dados.isbn !== null) {
    if (typeof dados.isbn !== 'string' || dados.isbn.trim() === '') erros.push('isbn precisa ser um texto');
  }
  if (dados.ano !== undefined && dados.ano !== null) {
    if (!Number.isInteger(dados.ano)) erros.push('ano precisa ser um número inteiro');
  }
  if (dados.status !== undefined) {
    if (!STATUS_VALIDOS.includes(dados.status)) erros.push(`status precisa ser: ${STATUS_VALIDOS.join(', ')}`);
  }
  if (!parcial || dados.generoId !== undefined) {
    if (!Number.isInteger(dados.generoId) || dados.generoId <= 0) erros.push('generoId é obrigatório e precisa ser um número inteiro');
  }
  if (erros.length > 0) {
    throw new ErroApi(400, 'Dados inválidos', erros);
  }
}

export function lerId(texto) {
  const id = Number(texto);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroApi(400, 'O id precisa ser um número inteiro positivo');
  }
  return id;
}