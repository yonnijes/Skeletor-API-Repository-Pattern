
import connector from "../../../../common/persistence/mysql.persistence";
import { User } from "../../domain/user";
import { UserRepository } from "../../user.repository";

export class UserMySQLRepository implements UserRepository {
    public async all(): Promise<User[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM users ORDER BY id DESC'
        );

        return rows as User[];
    }
    public async find(email: string, password: string): Promise<User | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }
    public async store(entry: User): Promise<void> {
        const now = new Date();
        await connector.execute(
            'INSERT INTO users(name, email, password, created_at) VALUES(?, ?, ?)',
            [entry.name, entry.email, entry.password, now]
        );
    }

}