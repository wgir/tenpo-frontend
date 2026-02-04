import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus } from 'lucide-react';
import { EmployeeList } from '../features/employees/components/EmployeeList';
import { EmployeeForm } from '../features/employees/components/EmployeeForm';
import { useEmployees } from '../features/employees/hooks/useEmployees';

export const EmployeesPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const { employees, isLoading, createEmployee, updateEmployee, deleteEmployee } = useEmployees();

    const handleOpenCreate = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Empleados</h2>
                    <p className="text-slate-500">Gestiona los empleados de Tenpo.</p>
                </div>
                <Button onClick={handleOpenCreate} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nuevo Empleado</span>
                </Button>
            </div>

            <EmployeeList
                employees={employees}
                isLoading={isLoading}
                onEdit={(employee) => { setEditingItem(employee); setIsModalOpen(true); }}
                onDelete={deleteEmployee}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${editingItem ? 'Editar' : 'Nuevo'} Empleado`}
                size="md"
            >
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
            </Modal>
        </div>
    );
};
