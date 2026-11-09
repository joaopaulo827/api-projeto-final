import express from 'express';

const app = express();

app.use(express.json());

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
      'GET /api/usuarios',
      'GET /api/generos',
      'GET /api/livros',
      'GET /api/usuarios/:id',
      'GET /api/generos/:id',
      'GET /api/livros/:id'
    ]
  });
});

export default app;
