import express from 'express';

const app = express();

app.use(express.json());

const livros = [
  {id: 1, titulo: 'Dom Casmurro',isbn:'9788582850350', autor: 'Machado de Assis', status: 'disponivel',genero: 'Romance', ano: 1899 },
  {id: 2, titulo: 'O Pequeno Príncipe',isbn:'9788595081512', autor: 'Antoine de Saint-Exupéry', status: 'indisponivel', genero: 'Literatura infantil', ano: 1943},
  {id: 3, titulo: 'Harry Potter e a Pedra Filosofal',isbn:'9788532511010', autor: 'J.K. Rowling', status: 'emprestado', genero: 'Fantasia', ano: 1997},
  {id: 4, titulo: 'A Sombra do Vento',isbn:'9788556510341', autor: 'Carlos Ruiz Zafón', status: 'disponivel', genero: 'Mistério', ano: 2001},
  {id: 5, titulo: '1984', autor: 'George Orwell',isbn:'9788535914849', status: 'emprestado', genero: ' Ficção distópica', ano: 1949}  
];

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    horario: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    nome: 'Organizador de livros',
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
