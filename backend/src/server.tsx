// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';

import { testConnection } from './config/database';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    // Testar conexão com o banco
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();