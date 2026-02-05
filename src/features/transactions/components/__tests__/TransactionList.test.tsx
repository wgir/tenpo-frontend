import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransactionList } from '../TransactionList.tsx';
import { useClients } from '../../../clients/hooks/useClients.ts';
import type { Transaction } from '../../types/transaction.types.ts';

// Mock the useClients hook
vi.mock('../../../clients/hooks/useClients.ts', () => ({
    useClients: vi.fn(),
}));

describe('TransactionList Component', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    const mockOnFilterChange = vi.fn();

    const mockTransactions: Transaction[] = [
        {
            id: 1,
            client_id: 1,
            employee_id: 1,
            amount: 1000,
            date: '2023-01-01T10:00:00.000Z',
            merchant_or_business: 'Store A',
            client_name: 'Client A',
            employee_name: 'Employee A',
        },
        {
            id: 2,
            client_id: 2,
            employee_id: 2,
            amount: 2000,
            date: '2023-01-02T11:00:00.000Z',
            merchant_or_business: 'Store B',
            client_name: 'Client B',
            employee_name: 'Employee B',
        },
    ];

    beforeEach(() => {
        vi.resetAllMocks();
        (useClients as any).mockReturnValue({
            clients: [
                { id: 1, name: 'Client A' },
                { id: 2, name: 'Client B' },
            ],
            isLoading: false,
        });
    });

    it('renders loading state', () => {
        render(
            <TransactionList
                transactions={[]}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                isLoading={true}
            />
        );
        const skeletons = screen.getAllByRole('generic').filter(el => el.className.includes('animate-pulse'));
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('renders empty state', () => {
        render(
            <TransactionList
                transactions={[]}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        expect(screen.getByText(/Sin transacciones/i)).toBeDefined();
        expect(screen.getByText(/Aún no se han registrado transacciones/i)).toBeDefined();
    });

    it('renders a list of transactions', () => {
        render(
            <TransactionList
                transactions={mockTransactions}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        // Using getAllByText because Client A and Client B appear in both the filter dropdown and the table
        expect(screen.getAllByText('Client A').length).toBeGreaterThan(0);
        expect(screen.getByText('Employee A')).toBeDefined();
        expect(screen.getByText('Store A')).toBeDefined();
        expect(screen.getAllByText('Client B').length).toBeGreaterThan(0);
        expect(screen.getByText('Employee B')).toBeDefined();
        expect(screen.getByText('Store B')).toBeDefined();
    });

    it('calls onFilterChange when client filter changes', () => {
        render(
            <TransactionList
                transactions={mockTransactions}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                onFilterChange={mockOnFilterChange}
            />
        );
        const filterSelect = screen.getByDisplayValue(/Todos los clientes/i);
        fireEvent.change(filterSelect, { target: { value: '1' } });
        expect(mockOnFilterChange).toHaveBeenCalledWith(1);
    });

    it('calls onEdit when edit button is clicked', () => {
        render(
            <TransactionList
                transactions={mockTransactions}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
            />
        );
        const editButtons = screen.getAllByRole('button');
        const editButton = editButtons.find(btn => btn.querySelector('svg'));
        if (editButton) fireEvent.click(editButton);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTransactions[0]);
    });
});
