import { Repository } from 'typeorm';
import { User } from './models/user';
import { SignUpDto } from './dto/signup-user.dto';
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    create(data: SignUpDto): Promise<User>;
    findAll(condtion: any): Promise<User[]>;
    findOne(id: number): Promise<User>;
    find(email: string): Promise<User>;
    update(id: number, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
