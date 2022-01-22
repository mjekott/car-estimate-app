import { IsEmail, IsString, Length } from "class-validator"

export class SignUpDto {

    @IsEmail()
    readonly email: string

    @IsString()
    @Length(2)
    readonly password: string

}