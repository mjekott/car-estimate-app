import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as request from 'supertest';

export const Currentuser = createParamDecorator(
    (data: never, contex: ExecutionContext) => {
        const request = contex.switchToHttp().getRequest()
        return request.currentUser;
    }
)