import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus, Search, Filter } from 'lucide-react';
import { TransactionList } from '../features/transactions/components/TransactionList';
import { TransactionForm } from '../features/transactions/components/TransactionForm';
import { ClientList } from '../features/clients/components/ClientList';
import { ClientForm } from '../features/clients/components/ClientForm';
import { EmployeeList } from '../features/employees/components/EmployeeList';
import { EmployeeForm } from '../features/employees/components/EmployeeForm';
import { useTransactions } from '../features/transactions/hooks/useTransactions';
import { useClients } from '../features/clients/hooks/useClients';
import { useEmployees } from '../features/employees/hooks/useEmployees';

export const Dashboard: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'transactions' | 'clients' | 'employees'>('transactions');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const { transactions, isLoading: isLoadingTransactions, createTransaction } = useTransactions();
    const { clients, isLoading: isLoadingClients, createClient, updateClient, deleteClient } = useClients();
    const { employees, isLoading: isLoadingEmployees, createEmployee, updateEmployee, deleteEmployee } = useEmployees();

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    return (
        <MainLayout activeSection={activeSection} setActiveSection={setActiveSection}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        {activeSection === 'transactions' ? 'Transacciones' :
                            activeSection === 'clients' ? 'Clientes' : 'Empleados'}
                    </h2>
                    <p className="text-slate-500">
                        Gestiona los {activeSection === 'transactions' ? 'movimientos' :
                            activeSection === 'clients' ? 'clientes' : 'empleados'} de Tenpo.
                    </p>
                </div>
                <Button onClick={handleOpenCreate} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>
                        Nuevo {activeSection === 'transactions' ? 'Transacción' :
                            activeSection === 'clients' ? 'Cliente' : 'Empleado'}
                    </span>
                </Button>
            </div>



            {/* Main Content Area */}
            <div className="space-y-6">
                {/* Simple Filters */}
                <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter size={18} />
                    </Button>
                </div>

                {activeSection === 'transactions' && (
                    <TransactionList transactions={transactions} isLoading={isLoadingTransactions} />
                )}

                {activeSection === 'clients' && (
                    <ClientList
                        clients={clients}
                        isLoading={isLoadingClients}
                        onEdit={(client) => { setEditingItem(client); setIsModalOpen(true); }}
                        onDelete={deleteClient}
                    />
                )}

                {activeSection === 'employees' && (
                    <EmployeeList
                        employees={employees}
                        isLoading={isLoadingEmployees}
                        onEdit={(employee) => { setEditingItem(employee); setIsModalOpen(true); }}
                        onDelete={deleteEmployee}
                    />
                )}
            </div>

            {/* Creation/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${editingItem ? 'Editar' : 'Nueva'} ${activeSection === 'transactions' ? 'Transacción' : activeSection === 'clients' ? 'Cliente' : 'Empleado'}`}
                size={activeSection === 'transactions' ? 'lg' : 'md'}
            >
                {activeSection === 'transactions' && (
                    <TransactionForm
                        onSubmit={async (values) => {
                            await createTransaction(values);
                            setIsModalOpen(false);
                        }}
                    />
                )}
                {activeSection === 'clients' && (
                    <ClientForm
                        initialValues={editingItem}
                        onSubmit={async (values) => {
                            if (editingItem) {
                                await updateClient({ id: editingItem.id, data: values });
                            } else {
                                await createClient(values);
                            }
                            setIsModalOpen(false);
                        }}
                    />
                )}
                {activeSection === 'employees' && (
                    <EmployeeForm
                        initialValues={editingItem}
                        onSubmit={async (values) => {
                            if (editingItem) {
                                await updateEmployee({ id: editingItem.id, data: values });
                            } else {
                                await createEmployee(values);
                            }
                            setIsModalOpen(false);
                        }}
                    />
                )}
            </Modal>
        </MainLayout>
    );
};
