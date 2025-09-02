// src/middleware/validation.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ValidationError[] = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        }));
        
        res.status(400).json({ 
          success: false,
          error: 'Erro de validação',
          details: errors 
        });
      } else {
        next(error);
      }
    }
  };
};