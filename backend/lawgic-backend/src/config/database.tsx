;import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Testar conexão
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado ao PostgreSQL');
    client.release();
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error);
    process.exit(1);
  }
};