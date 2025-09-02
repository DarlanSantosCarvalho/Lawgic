// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        res.status(400).json({ errors });
      } else {
        next(error);
      }
    }
  };
};

// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

// src/middleware/notFound.ts
import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  next(error);
};