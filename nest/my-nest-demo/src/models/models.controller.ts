import { Body, Controller,Post,Res } from '@nestjs/common';
import { ModelsService } from './models.service.js';
import type { Response } from 'express';

@Controller('models')
export class ModelsController {

  constructor(private readonly modelsService:ModelsService){}

  @Post("chat")
  baseChat(@Body() body:{message:string}){
   return this.modelsService.baseChat(body.message as string);
  }

  @Post("chatSystem")
  chatSystem(@Body() body:{message:string,systemPrompt:string}){
    return this.modelsService.chatSystem(
      body.message as string,
      body.systemPrompt as string
    );
  }

  @Post("chatStream")
  chatStream(@Body() body:{message:string},@Res() res:Response){
    return this.modelsService.chatStream(body.message as string,res);
  }

  @Post("chatParser")
  chatWithParser(@Body() body:{message:string}){
    return this.modelsService.chatWithParser(body.message as string);
  }


}
