import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sidebar } from '../Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar', () => {
    it('renders all navigation links', () => {
        render(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        );

        expect(screen.getByText(/Overview/i)).toBeInTheDocument();
        expect(screen.getByText(/Transacciones/i)).toBeInTheDocument();
        expect(screen.getByText(/Clientes/i)).toBeInTheDocument();
        expect(screen.getByText(/Empleados/i)).toBeInTheDocument();
    });

    it('has correct links to paths', () => {
        render(
            <BrowserRouter>
                <Sidebar />
            </BrowserRouter>
        );

        expect(screen.getByRole('link', { name: /Overview/i })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: /Clientes/i })).toHaveAttribute('href', '/clients');
    });
});
