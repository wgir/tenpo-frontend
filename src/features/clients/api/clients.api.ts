import axiosInstance from '../../../api/axiosInstance';
import type { Client, CreateClientDTO, UpdateClientDTO } from '../types/client.types';

export const clientsApi = {
    getAll: async (): Promise<Client[]> => {
        const { data } = await axiosInstance.get('/client');
        return data;
    },
    getById: async (id: number): Promise<Client> => {
        const { data } = await axiosInstance.get(`/client/${id}`);
        return data;
    },
    create: async (client: CreateClientDTO): Promise<Client> => {
        const { data } = await axiosInstance.post('/client', client);
        return data;
    },
    update: async (id: number, client: UpdateClientDTO): Promise<Client> => {
        const { data } = await axiosInstance.put(`/client/${id}`, client);
        return data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/client/${id}`);
    },
};
