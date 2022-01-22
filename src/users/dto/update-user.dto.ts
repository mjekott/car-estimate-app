import { PartialType } from "@nestjs/mapped-types"
import { SignUpDto } from './signup-user.dto';

class UpdateUserDto extends PartialType(SignUpDto) {

}