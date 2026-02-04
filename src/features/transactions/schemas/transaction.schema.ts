import { z } from 'zod';

export const transactionSchema = z.object({
    amount: z.number().min(0, 'El monto no puede ser negativo'),
    merchant_or_business: z.string().min(1, 'El comercio es requerido'),
    employee_id: z.number().positive('Seleccione un empleado válido'),
    client_id: z.number().positive('Seleccione un cliente válido'),
    date: z.string().refine((date) => {
        return new Date(date) <= new Date();
    }, 'La fecha no puede ser futura'),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
