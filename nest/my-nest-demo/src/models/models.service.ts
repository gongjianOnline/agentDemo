import { Injectable } from '@nestjs/common';
import { config } from '../config';
import { ChatOllama } from '@langchain/ollama';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { Response } from 'express';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ModelsService {

    private chatOllama = new ChatOllama({
        model:config.ollama.chatModel,
        baseUrl:config.ollama.host,
        temperature:config.ollama.temperature,
        think:false, // 不进行思考，直接返回回答
        numPredict:512, //生成文本的最大 token 数量
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
        return {
            question:message,
            answer:response.content,
            usage:response.usage_metadata,
        }
    }

    /**
     * 带系统提示的聊天
     * @param message 消息
     * @param systemPrompt 系统提示
     * @returns 响应
     */
    async chatSystem(message:string,systemPrompt:string){
        const response = await this.chatOllama.invoke([
            new HumanMessage(message),
            new SystemMessage(systemPrompt),
        ]);
        return {
            systemPrompt,
            question:message,
            answer:response.content,
            usage:response.usage_metadata,
        };
    }

    /**
     * 流式聊天
     * @param message 消息
     * @returns 响应
     */
    async chatStream(message:string,res:Response){
        res.setHeader('Content-Type','text/event-stream');
        res.setHeader('Cache-Control','no-cache');
        res.setHeader('Connection','keep-alive');
        res.setHeader('Transfer-Encoding','chunked');
        res.setHeader('Access-Control-Allow-Origin', '*')

        const stream = await this.chatOllama.stream([
            new HumanMessage(message),
        ]);
        for await (const chunk of stream) {
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
         // 发送结束标记，前端据此判断流结束
        res.write('data: [DONE]\n\n')
        res.end()
    }


    /**
     * 带解析器的聊天
     * @param message 消息
     * @returns 响应
     */
    async chatWithParser(message:string){
        const chain = this.chatOllama
            .pipe(new StringOutputParser())
            .pipe(this.chatOllama)
            .pipe(new StringOutputParser());
        const response = await chain.invoke([
            new HumanMessage(message),
        ]);
        return {
            question:message,
            answer:response,
        };
    }
}
