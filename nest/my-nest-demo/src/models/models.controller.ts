import { Body, Controller,Post } from '@nestjs/common';
import { ModelsService } from './models.service.js';

@Controller('models')
export class ModelsController {

  constructor(private readonly modelsService:ModelsService){}

  @Post("chat")
  baseChat(@Body() body:{message:string}){
   return this.modelsService.baseChat(body.message as string);
  }
}
