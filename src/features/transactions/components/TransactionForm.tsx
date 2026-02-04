import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { transactionSchema, type TransactionFormValues } from '../schemas/transaction.schema';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useClients } from '../../clients/hooks/useClients';
import { useEmployees } from '../../employees/hooks/useEmployees';
import { ClientForm } from '../../clients/components/ClientForm';
import { EmployeeForm } from '../../employees/components/EmployeeForm';

interface TransactionFormProps {
    onSubmit: (values: TransactionFormValues) => Promise<void>;
    initialValues?: Partial<TransactionFormValues>;
    isLoading?: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, initialValues, isLoading }) => {
    const { clients, createClient } = useClients();
    const { employees, createEmployee } = useEmployees();

    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            ...initialValues,
            date: initialValues?.date
                ? new Date(initialValues.date).toISOString().slice(0, 16)
                : new Date().toISOString().slice(0, 16),
        },
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
                date: initialValues.date
                    ? new Date(initialValues.date).toISOString().slice(0, 16)
                    : new Date().toISOString().slice(0, 16),
            });
        }
    }, [initialValues, reset]);

    const selectedClientId = watch('client_id');

    const filteredEmployees = employees.filter(e => e.client_id === selectedClientId);

    const clientOptions = clients.map(c => ({ value: c.id, label: c.name }));
    const employeeOptions = filteredEmployees.map(e => ({ value: e.id, label: e.name }));

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4">
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <Select
                                label="Cliente"
                                options={clientOptions}
                                placeholder="Seleccione un cliente"
                                error={errors.client_id?.message}
                                {...register('client_id', { valueAsNumber: true })}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setIsClientModalOpen(true)}
                            className="mb-1"
                        >
                            <Plus size={20} />
                        </Button>
                    </div>

                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <Select
                                label="Empleado"
                                options={employeeOptions}
                                placeholder="Seleccione un empleado"
                                error={errors.employee_id?.message}
                                disabled={!selectedClientId}
                                {...register('employee_id', { valueAsNumber: true })}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            disabled={!selectedClientId}
                            onClick={() => setIsEmployeeModalOpen(true)}
                            className="mb-1"
                        >
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        label="Monto (CLP)"
                        placeholder="0"
                        error={errors.amount?.message}
                        {...register('amount', { valueAsNumber: true })}
                    />
                    <Input
                        type="datetime-local"
                        label="Fecha y Hora"
                        error={errors.date?.message}
                        {...register('date')}
                    />
                </div>

                <Input
                    label="Comercio / Glosa"
                    placeholder="Ej: Starbuck Plaza Italia"
                    error={errors.merchant_or_business?.message}
                    {...register('merchant_or_business')}
                />



                <div className="pt-6">
                    <Button type="submit" isLoading={isLoading} className="w-full h-12 text-lg">
                        Guardar Transacción
                    </Button>
                </div>
            </form>

            {/* Nested Modals */}
            <Modal
                isOpen={isClientModalOpen}
                onClose={() => setIsClientModalOpen(false)}
                title="Crear Nuevo Cliente"
            >
                <ClientForm
                    onSubmit={async (values) => {
                        const newClient = await createClient(values);
                        setValue('client_id', newClient.id);
                        setIsClientModalOpen(false);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isEmployeeModalOpen}
                onClose={() => setIsEmployeeModalOpen(false)}
                title="Crear Nuevo Empleado"
            >
                <EmployeeForm
                    initialValues={{ client_id: selectedClientId }}
                    onSubmit={async (values) => {
                        const newEmployee = await createEmployee(values);
                        setValue('employee_id', newEmployee.id);
                        setIsEmployeeModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};
