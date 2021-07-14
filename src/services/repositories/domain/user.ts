export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date | null;
    updated_at: Date | null;
}