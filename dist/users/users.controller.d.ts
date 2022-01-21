import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup-user.dto';
import { UpdateReportDto } from '../reports/dto/update-report.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    signup({ email, password }: SignUpDto, session: any): Promise<import("./models/user").User>;
    signin({ email, password }: SignUpDto, session: any): Promise<import("./models/user").User>;
    signout(req: Request): Promise<void>;
    me(user: any): Promise<any>;
    getUser(id: string): Promise<import("./models/user").User>;
    findAllUsers(email: string): Promise<import("./models/user").User[]>;
    removeUser(id: string): Promise<import("./models/user").User>;
    updateUser(id: string, body: UpdateReportDto): Promise<import("./models/user").User>;
}
