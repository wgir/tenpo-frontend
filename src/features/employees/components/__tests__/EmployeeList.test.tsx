import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmployeeList } from '../EmployeeList.tsx';
import type { Employee } from '../../types/employee.types.ts';

const mockEmployees: Employee[] = [
    { id: 1, name: 'Employee 1', rut: '11111111-1', client_id: 1, client_name: 'Client A' },
    { id: 2, name: 'Employee 2', rut: '22222222-2', client_id: 2, client_name: 'Client B' },
];

describe('EmployeeList Component', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    it('renders loading state', () => {
        render(
            <EmployeeList
                employees={[]}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isLoading={true}
            />
        );
        const skeletonElements = screen.getAllByRole('generic').filter(el => el.className.includes('animate-pulse'));
        expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('renders empty state', () => {
        render(
            <EmployeeList
                employees={[]}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isLoading={false}
            />
        );
        expect(screen.getByText('No hay empleados')).toBeDefined();
        expect(screen.getByText('Comienza agregando un nuevo empleado al sistema.')).toBeDefined();
    });

    it('renders a list of employees', () => {
        render(
            <EmployeeList
                employees={mockEmployees}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText('Employee 1')).toBeDefined();
        expect(screen.getByText('Employee 2')).toBeDefined();
        expect(screen.getByText('11111111-1')).toBeDefined();
        expect(screen.getByText('Client A')).toBeDefined();
        expect(screen.getByText('Client B')).toBeDefined();
    });

    it('calls onEdit when edit button is clicked', () => {
        render(
            <EmployeeList
                employees={mockEmployees}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        const editButtons = screen.getAllByRole('button').filter(btn => btn.parentElement?.className.includes('justify-end'));
        fireEvent.click(editButtons[0]);
        expect(mockOnEdit).toHaveBeenCalledWith(mockEmployees[0]);
    });

    it('calls onDelete when delete button is clicked and confirmed', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <EmployeeList
                employees={mockEmployees}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        const deleteButtons = screen.getAllByRole('button').filter(btn => btn.className.includes('hover:text-red-600'));
        fireEvent.click(deleteButtons[0]);

        expect(confirmSpy).toHaveBeenCalled();
        expect(mockOnDelete).toHaveBeenCalledWith(mockEmployees[0].id);

        confirmSpy.mockRestore();
    });
});
