"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
        // Mantém o stack trace limpo
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AppError);
        }
    }
}
exports.AppError = AppError;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    let statusCode = 500;
    let message = 'Erro interno do servidor';
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new AppError(`Rota não encontrada - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map