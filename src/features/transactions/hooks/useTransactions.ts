import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '../api/transactions.api';
import type { UpdateTransactionDTO } from '../types/transaction.types';

export const useTransactions = (clientId?: number) => {
    const queryClient = useQueryClient();

    const transactionsQuery = useQuery({
        queryKey: ['transactions', clientId],
        queryFn: () => clientId ? transactionsApi.getByClientId(clientId) : transactionsApi.getAll(),
    });

    const createTransactionMutation = useMutation({
        mutationFn: transactionsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    const updateTransactionMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateTransactionDTO }) =>
            transactionsApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    const deleteTransactionMutation = useMutation({
        mutationFn: transactionsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });

    return {
        transactions: transactionsQuery.data ?? [],
        isLoading: transactionsQuery.isLoading,
        isError: transactionsQuery.isError,
        createTransaction: createTransactionMutation.mutateAsync,
        isCreating: createTransactionMutation.isPending,
        updateTransaction: updateTransactionMutation.mutateAsync,
        isUpdating: updateTransactionMutation.isPending,
        deleteTransaction: deleteTransactionMutation.mutateAsync,
        isDeleting: deleteTransactionMutation.isPending,
    };
};
