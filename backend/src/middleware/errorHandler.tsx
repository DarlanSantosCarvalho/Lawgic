import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    
    // Mantém o stack trace limpo
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Rota não encontrada - ${req.originalUrl}`, 404);
  next(error);
};