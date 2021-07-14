
import { User } from './domain/user'

export interface UserRepository{
    find(email: string, password: string): Promise<User | null>;
    store(entry: User): Promise<void>; 
    all(): Promise<User[]>;
}