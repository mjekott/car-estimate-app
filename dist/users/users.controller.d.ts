import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    signup({ email, password }: SignUpDto, session: any): Promise<import("./models/user.entity").User>;
    signin({ email, password }: SignUpDto, session: any): Promise<import("./models/user.entity").User>;
    signout(req: Request): Promise<void>;
    me(user: any): Promise<any>;
    getUser(id: string): Promise<import("./models/user.entity").User>;
    findAllUsers(email: string): Promise<import("./models/user.entity").User[]>;
    removeUser(id: string): Promise<import("./models/user.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./models/user.entity").User>;
}
