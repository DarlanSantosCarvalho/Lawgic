"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = exports.updateNotificationSchema = exports.createNotificationSchema = void 0;
// src/validations/notificationValidation.ts
const zod_1 = require("zod");
exports.createNotificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
    description: zod_1.z.string().min(1, 'Descrição é obrigatória'),
    hearing_date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD'),
});
exports.updateNotificationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo').optional(),
    description: zod_1.z.string().min(1, 'Descrição é obrigatória').optional(),
    hearing_date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD').optional(),
    notified_name: zod_1.z.string().max(255, 'Nome muito longo').optional(),
    notified_email: zod_1.z.string().email('Email inválido').optional().or(zod_1.z.literal('')),
    notified_phone: zod_1.z.string().max(20, 'Telefone muito longo').optional(),
    notified_address: zod_1.z.string().max(500, 'Endereço muito longo').optional(),
    needs_additional_info: zod_1.z.boolean().optional(),
    status: zod_1.z.enum(['Em Andamento', 'Validação', 'Concluído']).optional(),
});
exports.validationSchema = zod_1.z.object({
    needs_additional_info: zod_1.z.boolean(),
});
//# sourceMappingURL=notificationValidation.js.map