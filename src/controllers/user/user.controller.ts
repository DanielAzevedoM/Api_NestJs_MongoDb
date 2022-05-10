import { Body, Controller, Delete, Get, Put, Req, UseGuards,  } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from 'src/dtos/user/user.dto';
import { UserService } from 'src/services/user/user.service';


@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('data')
    findOne(@Req() req) {
        const result = this.userService.findOne(req.user.id);

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    update(@Req() req, @Body() updateUserDto: UpdateUserDto) {

       return this.userService.update(req.user.id, updateUserDto);

    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    remove(@Req() req) {
        return this.userService.remove(req.user.id);
    }
}
