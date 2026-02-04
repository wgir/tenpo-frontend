import React from 'react';
import { Edit2, Trash2, User } from 'lucide-react';
import type { Client } from '../types/client.types';
import { Button } from '../../../components/ui/Button';

interface ClientListProps {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onEdit, onDelete, isLoading }) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 w-full animate-pulse bg-slate-100 rounded-lg" />
                ))}
            </div>
        );
    }

    if (clients.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <User className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No hay clientes</h3>
                <p className="text-slate-500">Comienza agregando un nuevo cliente al sistema.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100 text-slate-500 text-sm">
                        <th className="pb-4 font-medium">Nombre</th>
                        <th className="pb-4 font-medium">RUT</th>
                        <th className="pb-4 font-medium text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {clients.map((client) => (
                        <tr key={client.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xs">
                                        {(client.name || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-slate-900">{client.name || 'Sin nombre'}</span>
                                </div>
                            </td>
                            <td className="py-4 text-slate-600">{client.rut}</td>
                            <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(client)}
                                        className="h-8 w-8 text-slate-400 hover:text-primary-600"
                                    >
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(client.id)}
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
        </div>
    );
};
