import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClientList } from '../ClientList.tsx';
import type { Client } from '../../types/client.types.ts';

const mockClients: Client[] = [
    { id: 1, name: 'Client 1', rut: '11111111-1' },
    { id: 2, name: 'Client 2', rut: '22222222-2' },
];

describe('ClientList Component', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    it('renders loading state', () => {
        render(
            <ClientList
                clients={[]}
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
            <ClientList
                clients={[]}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isLoading={false}
            />
        );
        expect(screen.getByText('No hay clientes')).toBeDefined();
        expect(screen.getByText('Comienza agregando un nuevo cliente al sistema.')).toBeDefined();
    });

    it('renders a list of clients', () => {
        render(
            <ClientList
                clients={mockClients}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText('Client 1')).toBeDefined();
        expect(screen.getByText('Client 2')).toBeDefined();
        expect(screen.getByText('11111111-1')).toBeDefined();
        expect(screen.getByText('22222222-2')).toBeDefined();
    });

    it('calls onEdit when edit button is clicked', () => {
        render(
            <ClientList
                clients={mockClients}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        const editButtons = screen.getAllByRole('button').filter(btn => btn.parentElement?.className.includes('justify-end'));
        // The first edit button in the first row
        fireEvent.click(editButtons[0]);
        expect(mockOnEdit).toHaveBeenCalledWith(mockClients[0]);
    });

    it('calls onDelete when delete button is clicked and confirmed', () => {
        // Mock window.confirm
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <ClientList
                clients={mockClients}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );

        const deleteButtons = screen.getAllByRole('button').filter(btn => btn.className.includes('hover:text-red-600'));
        fireEvent.click(deleteButtons[0]);

        expect(confirmSpy).toHaveBeenCalled();
        expect(mockOnDelete).toHaveBeenCalledWith(mockClients[0].id);

        confirmSpy.mockRestore();
    });
});
