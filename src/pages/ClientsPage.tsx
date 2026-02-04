import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus } from 'lucide-react';
import { ClientList } from '../features/clients/components/ClientList';
import { ClientForm } from '../features/clients/components/ClientForm';
import { useClients } from '../features/clients/hooks/useClients';

export const ClientsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const { clients, isLoading, createClient, updateClient, deleteClient } = useClients();

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Clientes</h2>
                    <p className="text-slate-500">Gestiona los clientes de Tenpo.</p>
                </div>
                <Button onClick={handleOpenCreate} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nuevo Cliente</span>
                </Button>
            </div>

            <ClientList
                clients={clients}
                isLoading={isLoading}
                onEdit={(client) => { setEditingItem(client); setIsModalOpen(true); }}
                onDelete={deleteClient}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${editingItem ? 'Editar' : 'Nuevo'} Cliente`}
                size="md"
            >
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
            </Modal>
        </div>
    );
};
