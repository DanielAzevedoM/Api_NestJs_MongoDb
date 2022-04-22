import {  Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserDto } from 'src/dtos/user/user.dto';



@Controller('user')
export class AuthController {

  constructor( private readonly authService: AuthService ){}

  @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Body() userDto: UserDto) {
        return this.authService.login(userDto)
    }

}
