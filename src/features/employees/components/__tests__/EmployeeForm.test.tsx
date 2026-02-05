import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EmployeeForm } from '../EmployeeForm.tsx';
import { useClients } from '../../../clients/hooks/useClients.ts';

// Mock the useClients hook
vi.mock('../../../clients/hooks/useClients', () => ({
    useClients: vi.fn(),
}));

describe('EmployeeForm Component', () => {
    const mockOnSubmit = vi.fn().mockResolvedValue(undefined);
    const mockClients = [
        { id: 1, name: 'Client 1', rut: '11111111-1' },
        { id: 2, name: 'Client 2', rut: '22222222-2' },
    ];

    beforeEach(() => {
        vi.resetAllMocks();
        (useClients as any).mockReturnValue({
            clients: mockClients,
            isLoading: false,
        });
    });

    it('renders the form with empty values and clients loaded', () => {
        render(<EmployeeForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/Nombre del Empleado/i)).toBeDefined();
        expect(screen.getByLabelText(/RUT del Empleado/i)).toBeDefined();
        expect(screen.getByLabelText(/Cliente/i)).toBeDefined();

        // Check if options are rendered
        const select = screen.getByLabelText(/Cliente/i) as HTMLSelectElement;
        expect(select.options.length).toBe(3); // Placeholder + 2 clients
        expect(screen.getByRole('button', { name: /Guardar Empleado/i })).toBeDefined();
    });

    it('renders with initial values for editing', () => {
        const initialValues = { id: 1, name: 'Existing Employee', rut: '12345678-9', client_id: 2 };
        render(<EmployeeForm onSubmit={mockOnSubmit} initialValues={initialValues} />);

        expect(screen.getByDisplayValue('Existing Employee')).toBeDefined();
        expect(screen.getByDisplayValue('12345678-9')).toBeDefined();
        expect(screen.getByDisplayValue('Client 2')).toBeDefined();
        expect(screen.getByRole('button', { name: /Actualizar Empleado/i })).toBeDefined();
    });

    it('shows validation errors for empty fields', async () => {
        render(<EmployeeForm onSubmit={mockOnSubmit} />);

        fireEvent.click(screen.getByRole('button', { name: /Guardar Empleado/i }));

        expect(await screen.findByText(/El nombre debe tener al menos 3 caracteres/i)).toBeDefined();
        expect(await screen.findByText(/El RUT es inválido/i)).toBeDefined();
        // The error message for client_id is "Invalid input: expected number, received NaN" because it's valueAsNumber and empty string is NaN
        expect(await screen.findByText(/Invalid input: expected number, received NaN/i)).toBeDefined();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit with form values when valid', async () => {
        render(<EmployeeForm onSubmit={mockOnSubmit} />);

        fireEvent.change(screen.getByLabelText(/Nombre del Empleado/i), { target: { value: 'New Employee' } });
        fireEvent.change(screen.getByLabelText(/RUT del Empleado/i), { target: { value: '12345678-9' } });

        // Selection in custom Select component
        fireEvent.change(screen.getByLabelText(/Cliente/i), { target: { value: '1' } });

        const submitButton = screen.getByRole('button', { name: /Guardar Empleado/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
        }, { timeout: 2000 });

        expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
            name: 'New Employee',
            rut: '12345678-9',
            client_id: 1
        }), expect.anything());
    });

    it('disables client select when isLoadingClients is true', () => {
        (useClients as any).mockReturnValue({
            clients: [],
            isLoading: true,
        });

        render(<EmployeeForm onSubmit={mockOnSubmit} />);
        const select = screen.getByLabelText(/Cliente/i);
        expect((select as HTMLSelectElement).disabled).toBe(true);
    });
});
