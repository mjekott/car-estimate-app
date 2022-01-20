import { Body, Controller, Get, Post, Param, Query, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup-user.dto';
import { UpdateReportDto } from '../reports/dto/update-report.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("/signup")
  async signup(@Body() body: SignUpDto) {
    return this.usersService.create(body)
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateReportDto) {
    return this.usersService.update(+id, body)
  }
}
