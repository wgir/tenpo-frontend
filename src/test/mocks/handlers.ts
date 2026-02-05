import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:8080';

export const handlers = [
    // Clients
    http.get(`${API_URL}/client`, () => {
        return HttpResponse.json([
            { id: 1, name: 'Client 1', rut: '11111111-1' },
            { id: 2, name: 'Client 2', rut: '22222222-2' },
        ]);
    }),

    http.post(`${API_URL}/client`, async ({ request }) => {
        const newClient = await request.json() as any;
        return HttpResponse.json({ id: 3, ...newClient }, { status: 201 });
    }),

    // Employees
    http.get(`${API_URL}/employee`, () => {
        return HttpResponse.json([
            { id: 1, name: 'Employee 1', rut: '33333333-3', client_id: 1 },
        ]);
    }),

    // Transactions
    http.get(`${API_URL}/transaction`, () => {
        return HttpResponse.json([]);
    }),
];
