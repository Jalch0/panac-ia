import {z} from "zod"

/**
 * Función que define un esquema de validación para los mensajes, que incluye un identificador, un indicador de 
 * si es un mensaje del usuario, y el texto del mensaje.
 */
export const MessageSchema = z.object({
    id: z.string(),
    isUserMessage: z.boolean(),
    text: z.string()
})

//validador de array
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
