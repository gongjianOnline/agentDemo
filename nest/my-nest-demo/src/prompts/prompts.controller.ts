import { Controller ,Post} from '@nestjs/common';
import {PromptsService} from "./prompts.service"

@Controller('prompts')
export class PromptsController {
    constructor(private readonly promptsService:PromptsService){}

    @Post("translate")
    translate(){
        return this.promptsService.translate();
    }
}
