;import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lawgic_db';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB Local');

    if (mongoose.connection.db) {
      console.log('📊 Database:', mongoose.connection.db.databaseName);
    } else {
      console.log('📊 Database: Conectado (nome não disponível)');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('📴 Desconectado do MongoDB');
};