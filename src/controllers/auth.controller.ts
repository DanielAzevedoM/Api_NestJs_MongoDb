import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/config/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/config/auth/local-auth.guard";
import { UserDto } from "src/dtos/user.dto";
import { User } from "src/interfaces/user.interface";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() userDto: UserDto){
        return this.authService.register(userDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Body() userDto: UserDto){
        return this.authService.login(userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    update(@Body() user: User, @Req() req){
        return this.authService.update(req.user.userId, user.password)
    }

}