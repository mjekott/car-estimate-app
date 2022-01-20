import { IsEmail, IsOptional, IsString } from "class-validator"

class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    @IsString()
    password?: string
}