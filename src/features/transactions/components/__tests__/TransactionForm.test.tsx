import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransactionForm } from '../TransactionForm.tsx';
import { useClients } from '../../../clients/hooks/useClients.ts';
import { useEmployees } from '../../../employees/hooks/useEmployees.ts';

// Mock the hooks
vi.mock('../../../clients/hooks/useClients.ts', () => ({
    useClients: vi.fn(),
}));
vi.mock('../../../employees/hooks/useEmployees.ts', () => ({
    useEmployees: vi.fn(),
}));

describe('TransactionForm Component', () => {
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    const mockClients = [{ id: 1, name: 'Client 1' }];
    const mockEmployees = [{ id: 1, name: 'Employee 1', client_id: 1 }];

    beforeEach(() => {
        vi.resetAllMocks();
        (useClients as any).mockReturnValue({
            clients: mockClients,
            createClient: vi.fn(),
        });
        (useEmployees as any).mockReturnValue({
            employees: mockEmployees,
            createEmployee: vi.fn(),
        });
    });

    it('renders the form and loads data', () => {
        render(<TransactionForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/Cliente/i)).toBeDefined();
        expect(screen.getByLabelText(/Empleado/i)).toBeDefined();
        expect(screen.getByLabelText(/Monto/i)).toBeDefined();
        expect(screen.getByLabelText(/Comercio \/ Glosa/i)).toBeDefined();
    });

    it('shows validation errors for empty fields', async () => {
        render(<TransactionForm onSubmit={mockOnSubmit} />);

        fireEvent.click(screen.getByRole('button', { name: /Guardar Transacción/i }));

        expect(await screen.findByText(/Seleccione un cliente válido/i)).toBeDefined();
        expect(await screen.findByText(/Seleccione un empleado válido/i)).toBeDefined();
        expect(await screen.findByText(/El comercio es requerido/i)).toBeDefined();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('filters employees based on selected client', async () => {
        const manyEmployees = [
            { id: 1, name: 'Emp 1', client_id: 1 },
            { id: 2, name: 'Emp 2', client_id: 2 },
        ];
        (useEmployees as any).mockReturnValue({
            employees: manyEmployees,
            createEmployee: vi.fn(),
        });

        render(<TransactionForm onSubmit={mockOnSubmit} />);

        // Select Client 1
        const clientSelect = screen.getByLabelText(/Cliente/i);
        fireEvent.change(clientSelect, { target: { value: '1' } });

        const employeeSelect = screen.getByLabelText(/Empleado/i) as HTMLSelectElement;
        expect(employeeSelect.options.length).toBe(2);
        expect(screen.getByText('Emp 1')).toBeDefined();
        expect(screen.queryByText('Emp 2')).toBeNull();
    });

    it('calls onSubmit with correct values', async () => {
        render(<TransactionForm onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByLabelText(/Cliente/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Empleado/i), { target: { value: '1' } });
        fireEvent.change(screen.getByLabelText(/Monto/i), { target: { value: '5000' } });
        fireEvent.change(screen.getByLabelText(/Comercio \/ Glosa/i), { target: { value: 'Test Store' } });

        // Set a valid past date
        fireEvent.change(screen.getByLabelText(/Fecha y Hora/i), { target: { value: '2020-01-01T12:00' } });

        const submitButton = screen.getByRole('button', { name: /Guardar Transacción/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        }, { timeout: 2000 });

        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
            client_id: 1,
            employee_id: 1,
            amount: 5000,
            merchant_or_business: 'Test Store'
        }), expect.anything());
    });

    it('opens client modal when plus button is clicked', () => {
        render(<TransactionForm onSubmit={mockOnSubmit} />);

        const plusButtons = screen.getAllByRole('button').filter(btn => btn.querySelector('svg.lucide-plus'));
        fireEvent.click(plusButtons[0]);

        expect(screen.getByText('Crear Nuevo Cliente')).toBeDefined();
    });
});
