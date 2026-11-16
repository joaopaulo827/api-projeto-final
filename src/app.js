import express from 'express';
import usuariosRoutes from './routes/usuariosRoutes.js';
import generosRoutes from './routes/generosRoutes.js';
import livrosRoutes from './routes/livrosRoutes.js';

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
      'GET /api/health',
      'GET /api/usuarios',
      'GET /api/generos',
      'GET /api/livros',
      'GET /api/usuarios/:id',
      'GET /api/generos/:id',
      'GET /api/livros/:id',
      'POST /api/usuarios',
      'POST /api/generos',
      'POST /api/livros',
      'PUT /api/livros/:id',
      'DELETE /api/livros/:id'
    ]
  });
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/generos', generosRoutes);
app.use('/api/livros', livrosRoutes);

app.use((req, res)=>{
   res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe` });
})
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

export default app;
