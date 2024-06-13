import { Message } from "@/app/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";
import { text } from "stream/consumers";

/**
 * Función que crea un contexto para almacenar y manipular mensajes en la aplicación.
 * @param children
 * @returns Elementos hijos dentro del proveedor de mensajes.
 */
export const MessagesContext = createContext<{
    messages: Message[]
    isMessageUpdating: boolean
    addMessage: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    messages: [],
    isMessageUpdating: false,
    addMessage: () => {},
    removeMessage: () => {},
    updateMessage: () => {},
    setIsMessageUpdating: () => {}
})

/**
 * Función y componente que establece un proveedor de mensajes que gestiona el estado de los mensajes en la aplicación.
 * @param {children}
 * @returns <MessagesContext.Provider></MessagesContext.Provider>
 */
export function MessagesProvider({children}: {children: ReactNode}) {
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            text: '¡Hola, soy tu asistente médico! ¿Cómo puedo ayudarte?',
            isUserMessage: false,
        },
    ])

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((message) => message.id != id))
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages((prev) =>
            prev.map((message) => {
              if (message.id === id) {
                return { ...message, text: updateFn(message.text) }
              }
              return message
            })
          )
    }

    return <MessagesContext.Provider value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating
    }}>
        {children}
    </MessagesContext.Provider>
}