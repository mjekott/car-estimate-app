import { PartialType } from "@nestjs/mapped-types"
import { SignUpDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {

}