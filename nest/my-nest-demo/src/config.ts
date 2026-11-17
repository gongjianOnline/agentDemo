/**模型配置 */
export const config = {
    ollama: {
        // ollama地址
        host: 'http://localhost:11434',
        // 聊天模型
        chatModel:"qwen3.5:2b",
        // 嵌入模型，向量化模型，将文本转换为向量
        embeModel:"mxbai-embed-large:latest",
        // 文本生成的随机性，值越小，生成的文本越确定，值越大，生成的文本越随机
        temperature:0.3,
    }
}