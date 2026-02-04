import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeesApi } from '../api/employees.api';
import type { UpdateEmployeeDTO } from '../types/employee.types';

export const useEmployees = () => {
    const queryClient = useQueryClient();

    const employeesQuery = useQuery({
        queryKey: ['employees'],
        queryFn: employeesApi.getAll,
        select: (data) => [...data].sort((a, b) => a.name.localeCompare(b.name)),
    });

    const createEmployeeMutation = useMutation({
        mutationFn: employeesApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });

    const updateEmployeeMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeDTO }) =>
            employeesApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });

    const deleteEmployeeMutation = useMutation({
        mutationFn: employeesApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });

    return {
        employees: employeesQuery.data ?? [],
        isLoading: employeesQuery.isLoading,
        isError: employeesQuery.isError,
        createEmployee: createEmployeeMutation.mutateAsync,
        isCreating: createEmployeeMutation.isPending,
        updateEmployee: updateEmployeeMutation.mutateAsync,
        isUpdating: updateEmployeeMutation.isPending,
        deleteEmployee: deleteEmployeeMutation.mutateAsync,
        isDeleting: deleteEmployeeMutation.isPending,
    };
};
