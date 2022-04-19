import { Controller, Get, Redirect } from "@nestjs/common";

@Controller('')
export class AppController {

    @Get()
    @Redirect('user')
    redirect(){};// Perguntar como redirecionar sem ter que declarar uma função.
    
    
}
