import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/app/lib/openai-stream";
import { MessageArraySchema } from "@/app/lib/validators/message";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";

/**
 * Función asíncrona que maneja la solicitud POST que procesa los mensajes del chat y genera una respuesta del modelo de OpenAI.
 * @param { Request }
 * @returns Response(stream) respuesta que contiene un flujo de datos generado por el modelo de OpenAI.
 */
export async function POST(req: Request) {
    const { messages } = await req.json();
  
    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
      return {
        role: message.isUserMessage ? 'user' : 'system',
        content: message.text,
      }
    })
  
    outboundMessages.unshift({
      role: 'system',
      content: chatbotPrompt,
    })
  
    const payload: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 250,
      stream: true,
      n: 1,
    }
  
    const stream = await OpenAIStream(payload)
  
    return new Response(stream)
  }