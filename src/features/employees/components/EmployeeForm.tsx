import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, type EmployeeFormValues } from '../schemas/employee.schema';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { useClients } from '../../clients/hooks/useClients';

interface EmployeeFormProps {
    onSubmit: (values: EmployeeFormValues) => Promise<void>;
    initialValues?: Partial<EmployeeFormValues>;
    isLoading?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, initialValues, isLoading }) => {
    const { clients, isLoading: isLoadingClients } = useClients();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: initialValues,
    });

    const clientOptions = clients.map(c => ({
        value: c.id,
        label: c.name
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nombre del Empleado"
                placeholder="Ej: Maria Lopez"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="RUT del Empleado"
                placeholder="Ej: 12345678-9"
                error={errors.rut?.message}
                {...register('rut')}
            />
            <Select
                label="Cliente"
                options={clientOptions}
                placeholder="Seleccione un cliente"
                error={errors.client_id?.message}
                disabled={isLoadingClients}
                {...register('client_id', { valueAsNumber: true })}
            />
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="submit" isLoading={isLoading} className="w-full">
                    {initialValues ? 'Actualizar Empleado' : 'Guardar Empleado'}
                </Button>
            </div>
        </form>
    );
};
