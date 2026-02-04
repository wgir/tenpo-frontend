import axiosInstance from '../../../api/axiosInstance';
import type { Employee, CreateEmployeeDTO, UpdateEmployeeDTO } from '../types/employee.types';

export const employeesApi = {
    getAll: async (): Promise<Employee[]> => {
        const { data } = await axiosInstance.get('/employee');
        return data;
    },
    getById: async (id: number): Promise<Employee> => {
        const { data } = await axiosInstance.get(`/employee/${id}`);
        return data;
    },
    create: async (employee: CreateEmployeeDTO): Promise<Employee> => {
        const { data } = await axiosInstance.post('/employee', employee);
        return data;
    },
    update: async (id: number, employee: UpdateEmployeeDTO): Promise<Employee> => {
        const { data } = await axiosInstance.put(`/employee/${id}`, employee);
        return data;
    },
    delete: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/employee/${id}`);
    },
};
