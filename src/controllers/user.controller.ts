import { Body, Controller, Delete, Get, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/config/auth/jwt-auth.guard";
import { User } from "src/interfaces/user.interface";
import { UserService } from "src/services/user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService ){}

    @UseGuards(JwtAuthGuard)
    @Get('data')
    getUser(@Req() req){
        return this.userService.findOne(req.user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.userService.findAll() 
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    update(@Body() user: User, @Req() req){
        return this.userService.update(req.user.userId, user)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    delete(@Req() req){
        return this.userService.delete(req.user.userId)
    }
  
}