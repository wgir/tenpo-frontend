import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useClients } from '../useClients';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useClients hook', () => {
    it('fetches clients successfully', async () => {
        const { result } = renderHook(() => useClients(), {
            wrapper: createWrapper(),
        });

        // Initially loading
        expect(result.current.isLoading).toBe(true);

        // Wait for data
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.clients).toHaveLength(2);
        expect(result.current.clients[0].name).toBe('Client 1');
    });
});
