export interface Client {
    id: number;
    name: string;
    rut: string;
}

export type CreateClientDTO = Omit<Client, 'id'>;
export type UpdateClientDTO = Partial<CreateClientDTO>;
