import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from "bcryptjs"


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        let exist = await this.usersService.find(email);
        console.log(exist)
        if (exist) {
            throw new BadRequestException('Email in use')
        }

        const newPassword = await bcrypt.hash(password, 10)


        const user = await this.usersService.create({ email, password: newPassword })
        return user

    }

    async signin(email: string, password: string) {

        const user = await this.usersService.find(email)
        if (!user) {

            throw new BadRequestException("Invalid Credentials")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw new BadRequestException("Invalid Credentials")
        }

        return user;


    }

}