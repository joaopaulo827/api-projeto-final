
import express from 'express';

const app = express();

app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    genero: 'Romance',
    ano: 1899
  },
  {
    id: 2,
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    genero: 'Literatura infantil',
    ano: 1943
  },
  {
    id: 3,
    titulo: 'Harry Potter e a Pedra Filosofal',
    autor: 'J.K. Rowling',
    genero: 'Fantasia',
    ano: 1997
  },
  {
    id: 4,
    titulo: 'A Sombra do Vento',
    autor: 'Carlos Ruiz Zafón',
    genero: 'Mistério',
    ano: 2001
  },
  {
    id: 5,
    titulo: '1984',
    autor: 'George Orwell',
    genero: ' Ficção distópica',
    ano: 1949
  }  
];

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    horario: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    nome: 'API do meu projeto',
    versao: '0.1.0',
    rotas: [
      'GET /health',
      'GET /api/livros',
      'GET /api/livros/:id'
    ]
  });
});

app.get('/api/livros', (req, res) => {
  res.json(livros);
});

app.get('/api/livros/:id', (req, res) => {
  const id = Number(req.params.id);

  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    return res.status(404).json({
      erro: 'Livro não encontrado'
    });
  }

  res.json(livro);
});

export default app;
