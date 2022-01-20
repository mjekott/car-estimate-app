import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from "rxjs";
import { UsersService } from '../users.service';
export declare class CurrentUserInterceptor implements NestInterceptor {
    private readonly userService;
    constructor(userService: UsersService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
