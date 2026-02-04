import React from 'react';
import { CreditCard, Edit2, Trash2 } from 'lucide-react';
import type { Transaction } from '../types/transaction.types';
import { formatDate, formatCurrency } from '../../../utils/date';
import { Select } from '../../../components/ui/Select';
import { useClients } from '../../clients/hooks/useClients';
import { Button } from '../../../components/ui/Button';

interface TransactionListProps {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
    filterClientId?: number;
    onFilterChange?: (clientId: number | undefined) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    onEdit,
    onDelete,
    isLoading,
    filterClientId,
    onFilterChange
}) => {
    const handleDelete = (id: number) => {
        if (window.confirm('¿Está seguro de eliminar el registro?')) {
            onDelete(id);
        }
    };

    const { clients, isLoading: isLoadingClients } = useClients();
    const clientOptions = [
        { value: '', label: 'Todos los clientes' },
        ...clients.map(c => ({
            value: c.id,
            label: c.name
        }))
    ];

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onFilterChange?.(value ? Number(value) : undefined);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 w-full animate-pulse bg-slate-100 rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Simple Filters */}
            <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Select
                        label="Filtrar por Cliente"
                        options={clientOptions}
                        value={filterClientId ?? ''}
                        onChange={handleFilterChange}
                        disabled={isLoadingClients}
                    />
                </div>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <CreditCard className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900">Sin transacciones</h3>
                    <p className="text-slate-500">
                        {filterClientId
                            ? 'Este cliente aún no tiene transacciones registradas.'
                            : 'Aún no se han registrado transacciones en el sistema.'}
                    </p>
                </div>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-500 text-sm">
                            <th className="pb-4 font-medium">Cliente</th>
                            <th className="pb-4 font-medium">Empleado</th>
                            <th className="pb-4 font-medium">Negocio</th>
                            <th className="pb-4 font-medium">Fecha</th>
                            <th className="pb-4 font-medium">Monto</th>
                            <th className="pb-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                                            {(transaction.client_name || '?').charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-900">{transaction.client_name || 'Sin nombre'}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-slate-600">{transaction.employee_name}</td>
                                <td className="py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                        {transaction.merchant_or_business}
                                    </span>
                                </td>
                                <td className="py-4 text-slate-600">{formatDate(transaction.date)}</td>
                                <td className="py-4 text-right">{formatCurrency(transaction.amount)}</td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(transaction)}
                                            className="h-8 w-8 text-slate-400 hover:text-primary-600"
                                        >
                                            <Edit2 size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(transaction.id)}
                                            className="h-8 w-8 text-slate-400 hover:text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
