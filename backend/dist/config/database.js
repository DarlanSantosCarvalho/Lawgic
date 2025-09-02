"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.pool = void 0;
// src/config/database.tsx
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});
// Testar conexão
const testConnection = async () => {
    try {
        const client = await exports.pool.connect();
        console.log('✅ Conectado ao PostgreSQL');
        client.release();
    }
    catch (error) {
        console.error('❌ Erro ao conectar com PostgreSQL:', error);
        process.exit(1);
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=database.js.map