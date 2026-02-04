import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus } from 'lucide-react';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { TransactionForm } from '../features/transactions/components/TransactionForm';
import { useTransactions } from '../features/transactions/hooks/useTransactions';

export const TransactionsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [selectedClientId, setSelectedClientId] = useState<number | undefined>();

    const { transactions, isLoading, createTransaction, updateTransaction, deleteTransaction } = useTransactions(selectedClientId);

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Transacciones</h2>
                    <p className="text-slate-500">Gestiona los movimientos de Tenpo.</p>
                </div>
                <Button onClick={handleOpenCreate} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nueva Transacción</span>
                </Button>
            </div>

            <TransactionList
                transactions={transactions}
                filterClientId={selectedClientId}
                onFilterChange={setSelectedClientId}
                onEdit={(transaction) => { setEditingItem(transaction); setIsModalOpen(true); }}
                onDelete={deleteTransaction}
                isLoading={isLoading}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${editingItem ? 'Editar' : 'Nueva'} Transacción`}
                size="lg"
            >
                <TransactionForm
                    initialValues={editingItem}
                    onSubmit={async (values) => {
                        if (editingItem) {
                            await updateTransaction({ id: editingItem.id, data: values });
                        } else {
                            await createTransaction(values);
                        }
                        setIsModalOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};
