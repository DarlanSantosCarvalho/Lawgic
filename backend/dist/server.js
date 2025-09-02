"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api', routes_1.default);
app.use(errorHandler_1.errorHandler);
const startServer = async () => {
    try {
        // Testar conexão com o banco
        await (0, database_1.testConnection)();
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
            console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error('❌ Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map