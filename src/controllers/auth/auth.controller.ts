import {  Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto, UserDto } from 'src/dtos/user/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor( private readonly authService: AuthService ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() userDto: UserDto) {
   
      return  this.authService.login(userDto)
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return this.authService.create(createUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('changePassword')
    changePassword(@Req() req, @Body() body: { newPassword: string }){

      return this.authService.updatePassword(req.user.email, body.newPassword)
    }

}
