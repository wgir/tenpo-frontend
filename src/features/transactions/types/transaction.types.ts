export interface Transaction {
    id: number;
    amount: number;
    merchant_or_business: string;
    employee_id: number;
    client_id: number;
    date: string;
    employee_name?: string;
    client_name?: string;
}

export type CreateTransactionDTO = Omit<Transaction, 'id' | 'employee_name' | 'client_name'>;
export type UpdateTransactionDTO = Partial<CreateTransactionDTO>;
