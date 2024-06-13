"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes, useContext } from "react";
import MarkdownLite from "./MarkdownLite";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Componente que muestra los mensajes en el chat, con capacidades de desplazamiento y renderización inversa.
 * @param { className, ...props }
 * @returns <ChatMessages />
 */
const ChatMessages: React.FC<ChatMessagesProps> = ({ className, ...props }) => {
  const { messages } = useContext(MessagesContext);
  const inverseMessages = [...messages].reverse();

  return (
    <div
      {...props}
      className={cn(
        'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
        className
      )}>
      <div className='flex-1 flex-grow' />
      {inverseMessages.map((message) => {
        return (
          <div className='chat-message' key={`${message.id}-${message.id}`}>
            <div
              className={cn('flex items-end', {
                'justify-end': message.isUserMessage,
              })}>
              <div
                className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                  'order-1 items-end': message.isUserMessage,
                  'order-2 items-start': !message.isUserMessage,
                })}>
                <p
                  className={cn('px-4 py-2 rounded-lg', {
                    'bg-secondary text-white': message.isUserMessage,
                    'bg-gray-200 text-gray-900': !message.isUserMessage,
                  })}>
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default ChatMessages;
