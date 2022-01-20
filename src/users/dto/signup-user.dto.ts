import { IsEmail, IsString, Length } from "class-validator"

export class SignUpDto {

    @IsEmail()
    email: string

    @IsString()
    @Length(2)
    password: string

}