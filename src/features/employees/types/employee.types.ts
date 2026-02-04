export interface Employee {
    id: number;
    name: string;
    rut: string;
    client_id: number;
    client_name?: string; // Optativo, para mostrar en listas
}

export type CreateEmployeeDTO = Omit<Employee, 'id' | 'client_name'>;
export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO>;
