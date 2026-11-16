import express from 'express';
import 'dotenv/config';
import AdministradorRoute from './routes/AdministradorRoute.js';
import SobreNosRoute from './routes/SobreNosRoutes.js';
import dicaRoutes from './routes/DicaRoutes.js';
import estagioRoutes from './routes/EstagioRoutes.js';
import membroEquipeRoutes from './routes/MembroEquipeRoutes.js';
import SimuladoRoute from './routes/SimuladoRoute.js';
import QuestaoSimuladoRoute from './routes/QuestaoSimuladoRoute.js';
import RespostaSimuladoRoute from './routes/RespostaSimuladoRoute.js';
import VideoRoute from './routes/VideoRoute.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api/administradores', AdministradorRoute);
app.use('/api/SobreNos', SobreNosRoute);
app.use('/api/dicas', dicaRoutes);
app.use('/api/estagios', estagioRoutes);
app.use('/api/membros-equipe', membroEquipeRoutes);
app.use('/api/simulados', SimuladoRoute);
app.use('/api/questoes-simulados', QuestaoSimuladoRoute);
app.use('/api/respostas-simulados', RespostaSimuladoRoute);
app.use('/api/videos', VideoRoute);
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});