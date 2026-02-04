import React from 'react';
import { Edit2, Trash2, UserCircle } from 'lucide-react';
import type { Employee } from '../types/employee.types';
import { Button } from '../../../components/ui/Button';

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
    isLoading?: boolean;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete, isLoading }) => {
    const handleDelete = (id: number) => {
        if (window.confirm('¿Está seguro de eliminar el registro?')) {
            onDelete(id);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 w-full animate-pulse bg-slate-100 rounded-lg" />
                ))}
            </div>
        );
    }

    if (employees.length === 0) {
        return (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                <UserCircle className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">No hay empleados</h3>
                <p className="text-slate-500">Comienza agregando un nuevo empleado al sistema.</p>
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
                        <th className="pb-4 font-medium">Cliente</th>
                        <th className="pb-4 font-medium text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {employees.map((employee) => (
                        <tr key={employee.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                                        {(employee.name || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-slate-900">{employee.name || 'Sin nombre'}</span>
                                </div>
                            </td>
                            <td className="py-4 text-slate-600">{employee.rut}</td>
                            <td className="py-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                    {employee.client_name || `ID: ${employee.client_id}`}
                                </span>
                            </td>
                            <td className="py-4 text-right">
                                <div className="flex items-center justify-end space-x-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(employee)}
                                        className="h-8 w-8 text-slate-400 hover:text-primary-600"
                                    >
                                        <Edit2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(employee.id)}
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
