import { Body, Controller, Get, Post, Param, Query, Delete, Patch, Session, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signup-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Currentuser } from './decorators/current-user.decorator';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

  @Post("/signup")
  async signup(@Body() { email, password }: SignUpDto, @Session() session) {
    const user = await this.authService.signup(email, password);
    session.userId = user.id
    return user;
  }


  @Post("/signin")
  async signin(@Body() { email, password }: SignUpDto, @Session() session) {
    const user = await this.authService.signin(email, password);
    session.userId = user.id
    return user;
  }


  @Post('/signout')
  @UseGuards(AuthGuard)
  async signout(@Req() req: Request) {
    req.session.userId = null

  }


  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Currentuser() user) {
    return user
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
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body)
  }
}
