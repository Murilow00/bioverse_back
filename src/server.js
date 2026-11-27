import express from 'express';
import 'dotenv/config';
import AdministradorRoute from './routes/administradorRoute.js';
import carreirasRoutes from './routes/carreirasRoutes.js';
import SobreNosRoute from './routes/sobreNosRoutes.js';
import dicaRoutes from './routes/dicaRoutes.js';
import estagioRoutes from './routes/estagioRoutes.js';
import membroEquipeRoutes from './routes/membroEquipeRoutes.js';
import noticiaRoutes from './routes/noticiaRoutes.js';
import SimuladoRoute from './routes/simuladoRoute.js';
import QuestaoSimuladoRoute from './routes/questaoSimuladoRoute.js';
import RespostaSimuladoRoute from './routes/respostaSimuladoRoute.js';
import VideoRoute from './routes/videoRoute.js';
import UsuarioRoute from './routes/usuarioRoute.js';
import { apiKey } from './lib/middleware/apiKey.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/administradores', apiKey, AdministradorRoute);
app.use('/api/SobreNos', apiKey, SobreNosRoute);
app.use('/api/carreiras', apiKey, carreirasRoutes);
app.use('/api/dicas', apiKey, dicaRoutes);
app.use('/api/estagios', apiKey, estagioRoutes);
app.use('/api/membros-equipe', apiKey, membroEquipeRoutes);
app.use('/api/noticias', apiKey, noticiaRoutes);
app.use('/api/simulados', apiKey, SimuladoRoute);
app.use('/api/questoes-simulados', apiKey, QuestaoSimuladoRoute);
app.use('/api/respostas-simulados', apiKey, RespostaSimuladoRoute);
app.use('/api/videos', apiKey, VideoRoute);
app.use('/api/usuarios', apiKey, UsuarioRoute);
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});