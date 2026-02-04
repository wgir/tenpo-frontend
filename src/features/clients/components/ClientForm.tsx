import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, type ClientFormValues } from '../schemas/client.schema';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

interface ClientFormProps {
    onSubmit: (values: ClientFormValues) => Promise<void>;
    initialValues?: Partial<ClientFormValues & { id: number }>;
    isLoading?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialValues, isLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Nombre del Cliente"
                placeholder="Ej: Juan Pérez"
                error={errors.name?.message}
                {...register('name')}
            />
            <Input
                label="RUT del Cliente"
                placeholder="Ej: 12345678-9"
                error={errors.rut?.message}
                {...register('rut')}
            />
            <div className="flex justify-end space-x-3 pt-4">
                <Button type="submit" isLoading={isLoading} className="w-full">
                    {initialValues?.id ? 'Actualizar Cliente' : 'Guardar Cliente'}
                </Button>
            </div>
        </form>
    );
};
