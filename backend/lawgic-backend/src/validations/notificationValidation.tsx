// src/validations/notificationValidation.ts
import { z } from 'zod';

export const createNotificationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  hearing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
});

export const updateNotificationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo').optional(),
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  hearing_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD').optional(),
  notified_name: z.string().max(255, 'Nome muito longo').optional(),
  notified_email: z.string().email('Email inválido').optional().or(z.literal('')),
  notified_phone: z.string().max(20, 'Telefone muito longo').optional(),
  notified_address: z.string().max(500, 'Endereço muito longo').optional(),
  needs_additional_info: z.boolean().optional(),
  status: z.enum(['Em Andamento', 'Validação', 'Concluído']).optional(),
});

export const validationSchema = z.object({
  needs_additional_info: z.boolean(),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type ValidationInput = z.infer<typeof validationSchema>;