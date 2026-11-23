import express from 'express';
import livrosRoutes from './routes/livrosRoutes.js';
import generosRoutes from './routes/generosRoutes.js';
import { ErroApi } from './erros.js';

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
      'GET /api/livros',
      'GET /api/generos',
      'GET /api/livros/:id',
      'POST /api/livros',
      'POST /api/generos',
      'PUT /api/livros/:id',
      'DELETE /api/livros/:id'
    ]
  });
});
app.use('/api/livros', livrosRoutes);
app.use('/api/generos', generosRoutes);

app.use((req, res)=>{
   res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe` });
})
app.use((erro, req, res, next) => {

  if (erro instanceof ErroApi) {
    return res.status(erro.status).json({ erro: erro.message, detalhes: erro.detalhes });
  }

  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }

  if (erro.code === 'P2002') {
    return res.status(409).json({ erro: 'Já existe um registro com esse valor' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

export default app;
