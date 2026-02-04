import { z } from 'zod';

export const employeeSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    rut: z.string().min(8, 'El RUT es inválido').regex(/^[0-9]+-[0-9kK]{1}$/, 'Formato de RUT inválido (ej: 12345678-9)'),
    client_id: z.number().positive('Debe seleccionar un cliente'),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
