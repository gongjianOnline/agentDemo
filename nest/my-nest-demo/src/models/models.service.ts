import { Injectable } from '@nestjs/common';
import { config } from '../config.js';
import { ChatOllama } from '@langchain/ollama';
import { HumanMessage } from '@langchain/core/messages';

@Injectable()
export class ModelsService {

    private chatOllama = new ChatOllama({
        model:config.ollama.chatModel,
        baseUrl:config.ollama.host,
        temperature:config.ollama.temperature,
    });
    /**
     * 基础聊天
     * @param message 消息
     * @returns 响应
     */
    async baseChat(message:string){
        const response = await this.chatOllama.invoke([
            new HumanMessage(message),
        ]);
        return response.content;
    }
}
