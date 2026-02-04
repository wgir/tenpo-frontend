import React from 'react';
import { CreditCard, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '../types/transaction.types';
import { formatDate, formatCurrency } from '../../../utils/date';
import { Select } from '../../../components/ui/Select';
import { useClients } from '../../clients/hooks/useClients';

interface TransactionListProps {
    transactions: Transaction[];
    isLoading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading }) => {
    const { clients, isLoading: isLoadingClients } = useClients();
    const clientOptions = clients.map(c => ({
        value: c.id,
        label: c.name
    }));

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 w-full animate-pulse bg-slate-100 rounded-lg" />
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                <CreditCard className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Sin transacciones</h3>
                <p className="text-slate-500">Aún no se han registrado transacciones en el sistema.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Simple Filters */}
            <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Select
                        label="Cliente"
                        options={clientOptions}
                        disabled={isLoadingClients}
                    />
                </div>

            </div>
            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all group"
                >
                    <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                            <ArrowUpRight size={20} />
                        </div>
                        <div className="min-w-0">
                            <h4 className="font-semibold text-slate-900 truncate">
                                {transaction.merchant_or_business}
                            </h4>
                            <p className="text-xs text-slate-500 flex items-center space-x-2">
                                <span>{transaction.employee_name}</span>
                                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                                <span>{transaction.client_name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="font-bold text-slate-900">
                            {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                            {formatDate(transaction.date)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
