import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsApi } from '../api/clients.api';
import type { UpdateClientDTO } from '../types/client.types';

export const useClients = () => {
    const queryClient = useQueryClient();

    const clientsQuery = useQuery({
        queryKey: ['clients'],
        queryFn: clientsApi.getAll,
    });

    const createClientMutation = useMutation({
        mutationFn: clientsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });

    const updateClientMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateClientDTO }) =>
            clientsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });

    const deleteClientMutation = useMutation({
        mutationFn: clientsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });

    return {
        clients: clientsQuery.data ?? [],
        isLoading: clientsQuery.isLoading,
        isError: clientsQuery.isError,
        createClient: createClientMutation.mutateAsync,
        isCreating: createClientMutation.isPending,
        updateClient: updateClientMutation.mutateAsync,
        isUpdating: updateClientMutation.isPending,
        deleteClient: deleteClientMutation.mutateAsync,
        isDeleting: deleteClientMutation.isPending,
    };
};
