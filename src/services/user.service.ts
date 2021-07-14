
import { UserCreateDto } from '../dtos/user.dto';
import { ApplicationException } from '../common/exceptions/application.exception';
import SHA from 'sha.js';
import jwt from 'jsonwebtoken';
import { User } from './repositories/domain/user';
import { UserRepository } from './repositories/user.repository';

export class UserService { 

    constructor(
        private readonly UserRepository: UserRepository
    ) { }

    public async all(): Promise<User[]> {
        return await this.UserRepository.all();
    }

    async authenticate(email: string, password: string): Promise<string> {
      

        // Hash passowrd
        password = SHA('sha256').update(password).digest('base64');

        const user = await this.UserRepository.find(email, password);

        if (process.env.jwt_secret_key) {
            const secretKey: string = process.env.jwt_secret_key;

            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, secretKey, { expiresIn: '7h' });

                return token

            }
        } else {
            throw new Error('Secret key is not defined.');
        }

        throw new ApplicationException('Invalid user credentials supplied.');
    }

    async create(user: UserCreateDto): Promise<void> {
       

        // Hash password
        user.password = SHA('sha256').update(user.password).digest('base64');

        await this.UserRepository.store(user as User);
    }
}