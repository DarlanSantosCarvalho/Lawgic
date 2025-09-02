import { z } from 'zod';
export declare const createNotificationSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    hearing_date: z.ZodString;
}, z.core.$strip>;
export declare const updateNotificationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    hearing_date: z.ZodOptional<z.ZodString>;
    notified_name: z.ZodOptional<z.ZodString>;
    notified_email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    notified_phone: z.ZodOptional<z.ZodString>;
    notified_address: z.ZodOptional<z.ZodString>;
    needs_additional_info: z.ZodOptional<z.ZodBoolean>;
    status: z.ZodOptional<z.ZodEnum<{
        "Em Andamento": "Em Andamento";
        Validação: "Validação";
        Concluído: "Concluído";
    }>>;
}, z.core.$strip>;
export declare const validationSchema: z.ZodObject<{
    needs_additional_info: z.ZodBoolean;
}, z.core.$strip>;
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type ValidationInput = z.infer<typeof validationSchema>;
//# sourceMappingURL=notificationValidation.d.ts.map